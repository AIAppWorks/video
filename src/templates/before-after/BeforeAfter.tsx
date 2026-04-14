import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { z } from 'zod';
import { FadeIn } from '../../components/FadeIn';
import { SlideIn } from '../../components/SlideIn';
import { easeOutCubic } from '../../utils/easing';

export const BeforeAfterPropsSchema = z.object({
  beforeLabel: z.string(),
  afterLabel: z.string(),
  beforeValue: z.string(),
  afterValue: z.string(),
  summaryText: z.string(),
  bgColor: z.string(),
  beforeBgColor: z.string(),
  afterBgColor: z.string(),
  beforeTextColor: z.string(),
  afterTextColor: z.string(),
  dividerColor: z.string(),
  summaryColor: z.string(),
  labelFontSize: z.number(),
  valueFontSize: z.number(),
  summaryFontSize: z.number(),
});

type BeforeAfterProps = z.infer<typeof BeforeAfterPropsSchema>;

/**
 * BeforeAfter — 前后对比展示
 *
 * 帧时间轴：
 *   0  – 40  : Before 全屏显示
 *   40 – 110 : 分割线从左滑入，右侧 After 渐显
 *   110– 150 : 双栏并排稳定显示
 *   150– 180 : 底部总结文字淡入
 *
 * 总长 180 帧 @ 30fps = 6 秒
 */
export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeLabel,
  afterLabel,
  beforeValue,
  afterValue,
  summaryText,
  bgColor,
  beforeBgColor,
  afterBgColor,
  beforeTextColor,
  afterTextColor,
  dividerColor,
  summaryColor,
  labelFontSize,
  valueFontSize,
  summaryFontSize,
}) => {
  const frame = useCurrentFrame();

  // 分割线从 0% 滑到 50%（帧 40–110）
  const dividerProgress = easeOutCubic(
    Math.min(1, Math.max(0, (frame - 40) / 70))
  );
  const dividerX = dividerProgress * 50; // 0 → 50（百分比）

  // After 侧透明度（随分割线出现）
  const afterOpacity = interpolate(frame, [40, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 总结文字透明度（帧 150–180）
  const summaryOpacity = interpolate(frame, [150, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const centerFlex: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 16,
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        fontFamily: 'system-ui, -apple-system, "PingFang SC", "Hiragino Sans GB", sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Before 侧（始终显示，左半边） */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '50%',
          height: '100%',
          backgroundColor: beforeBgColor,
          ...centerFlex,
        }}
      >
        <p
          style={{
            fontSize: labelFontSize,
            color: beforeTextColor,
            margin: 0,
            opacity: 0.7,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {beforeLabel}
        </p>
        <span
          style={{
            fontSize: valueFontSize,
            fontWeight: 800,
            color: beforeTextColor,
            lineHeight: 1.1,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {beforeValue}
        </span>
      </div>

      {/* After 侧（随分割线出现，右半边） */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '50%',
          height: '100%',
          backgroundColor: afterBgColor,
          opacity: afterOpacity,
          ...centerFlex,
        }}
      >
        <p
          style={{
            fontSize: labelFontSize,
            color: afterTextColor,
            margin: 0,
            opacity: 0.7,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {afterLabel}
        </p>
        <span
          style={{
            fontSize: valueFontSize,
            fontWeight: 800,
            color: afterTextColor,
            lineHeight: 1.1,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          {afterValue}
        </span>
      </div>

      {/* 分割线（从左滑入） */}
      {dividerX > 0 && (
        <div
          style={{
            position: 'absolute',
            left: `${dividerX}%`,
            top: 0,
            width: 4,
            height: '100%',
            backgroundColor: dividerColor,
            transform: 'translateX(-50%)',
            boxShadow: `0 0 20px ${dividerColor}`,
          }}
        />
      )}

      {/* 总结文字（帧 150 后淡入，底部居中） */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: summaryOpacity,
        }}
      >
        <p
          style={{
            fontSize: summaryFontSize,
            color: summaryColor,
            margin: 0,
            textAlign: 'center',
            letterSpacing: '0.04em',
            padding: '0 80px',
          }}
        >
          {summaryText}
        </p>
      </div>

      {/* Segment 1: Before 全屏（帧 0–40，隐藏分割） */}
      <Sequence from={0} durationInFrames={40}>
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {/* Before 标签用 SlideIn 增强首帧入场 */}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
