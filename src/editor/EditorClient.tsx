'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Player } from '@remotion/player';
import type { VideoTemplate } from '@/templates/types';
import { PropsEditorPanel } from './PropsEditorPanel';

interface EditorClientProps {
  templateId: string;
  isLoggedIn?: boolean;
}

type RenderStatus = 'idle' | 'submitting' | 'rendering' | 'completed' | 'failed';

export function EditorClient({ templateId, isLoggedIn = false }: EditorClientProps) {
  const [template, setTemplate] = useState<VideoTemplate | null>(null);
  const [props, setProps] = useState<Record<string, unknown>>({});
  const [renderStatus, setRenderStatus] = useState<RenderStatus>('idle');
  const [renderProgress, setRenderProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 客户端动态加载模板
  useEffect(() => {
    async function loadTemplate() {
      await import('@/templates');
      const { getTemplate } = await import('@/templates/registry');
      const t = getTemplate(templateId);
      if (t) {
        setTemplate(t);
        setProps(t.defaultProps as Record<string, unknown>);
      }
    }
    loadTemplate();
  }, [templateId]);

  // 清理轮询
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  if (!template) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">加载模板中...</span>
        </div>
      </div>
    );
  }

  const handlePropsChange = (newProps: Record<string, unknown>) => {
    const result = template.schema.safeParse(newProps);
    if (result.success) {
      setProps(result.data as Record<string, unknown>);
    }
  };

  const handleExport = async () => {
    setRenderStatus('submitting');
    setRenderProgress(0);
    setDownloadUrl(null);
    setRenderError(null);

    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, props }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to start render');
      }
      const { jobId } = await res.json();
      setRenderStatus('rendering');

      // 开始轮询
      pollRef.current = setInterval(async () => {
        const poll = await fetch(`/api/render?jobId=${jobId}`);
        const data = await poll.json();

        setRenderProgress(data.progress ?? 0);

        if (data.status === 'completed') {
          clearInterval(pollRef.current!);
          setRenderStatus('completed');
          setDownloadUrl(data.downloadUrl);
        } else if (data.status === 'failed') {
          clearInterval(pollRef.current!);
          setRenderStatus('failed');
          setRenderError(data.error ?? '渲染失败');
        }
      }, 1500);
    } catch (e) {
      setRenderStatus('failed');
      setRenderError((e as Error).message);
    }
  };

  const isRendering = renderStatus === 'submitting' || renderStatus === 'rendering';

  return (
    <div className="flex flex-1 h-[calc(100vh-57px)]">
      {/* 左侧：Props 编辑面板 */}
      <aside className="w-80 flex-shrink-0 border-r border-slate-800 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-300">编辑属性</h2>
            <button
              onClick={() => setProps(template.defaultProps as Record<string, unknown>)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              重置默认值
            </button>
          </div>
          <PropsEditorPanel template={template} values={props} onChange={handlePropsChange} />
        </div>
      </aside>

      {/* 右侧：预览 + 导出 */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 bg-slate-950 p-8 overflow-auto">
        {/* Player 预览 */}
        <div className="w-full max-w-3xl">
          <Player
            component={template.component as React.ComponentType<Record<string, unknown>>}
            inputProps={props}
            durationInFrames={template.composition.durationInFrames}
            fps={template.composition.fps}
            compositionWidth={template.composition.width}
            compositionHeight={template.composition.height}
            style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}
            controls
            loop
          />
        </div>

        {/* 视频规格 */}
        <div className="flex gap-4 text-xs text-slate-500">
          <span>{template.composition.width}×{template.composition.height}</span>
          <span>{template.composition.fps}fps</span>
          <span>{(template.composition.durationInFrames / template.composition.fps).toFixed(1)}秒</span>
        </div>

        {/* 渲染进度条 */}
        {isRendering && (
          <div className="w-full max-w-xs flex flex-col gap-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>{renderStatus === 'submitting' ? '准备中...' : '渲染中...'}</span>
              <span>{renderProgress}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${renderProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* 错误提示 */}
        {renderStatus === 'failed' && renderError && (
          <div className="w-full max-w-xs bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 text-xs text-red-300">
            渲染失败：{renderError}
          </div>
        )}

        {/* 导出/下载按钮 */}
        {renderStatus === 'completed' && downloadUrl ? (
          <a
            href={downloadUrl}
            download
            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
          >
            下载视频 ↓
          </a>
        ) : !isLoggedIn ? (
          <a
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
          >
            登录后导出视频
          </a>
        ) : (
          <button
            onClick={handleExport}
            disabled={isRendering}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors"
          >
            {isRendering ? '渲染中...' : '导出视频'}
          </button>
        )}
      </main>
    </div>
  );
}
