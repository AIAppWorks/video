import React from 'react';
import { useCurrentFrame } from 'remotion';
import { easeOutCubic } from '../utils/easing';

export interface BarItem {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  bars: BarItem[];
  /** 手动设置最大值，默认取 bars 中最大值 */
  maxValue?: number;
  /** 动画总持续帧数（含各 bar 的错开延迟），默认 55 */
  durationFrames?: number;
  /** 柱子最大高度（px），默认 280 */
  maxHeight?: number;
  /** 柱子宽度（px），默认 130 */
  barWidth?: number;
}

/**
 * BarChart —— 逐柱错开出现的柱状图
 * 每根柱子延迟 8 帧后开始增长，使用 easeOutCubic easing
 */
export const BarChart: React.FC<BarChartProps> = ({
  bars,
  maxValue,
  durationFrames = 55,
  maxHeight = 280,
  barWidth = 130,
}) => {
  const frame = useCurrentFrame();
  const max = maxValue ?? Math.max(...bars.map((b) => b.value));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 80,
        height: maxHeight + 90,
      }}
    >
      {bars.map((bar, i) => {
        // 每根柱子错开 8 帧出现
        const delay = i * 8;
        const adjustedFrame = Math.max(0, frame - delay);
        const effectiveDuration = Math.max(1, durationFrames - delay);
        const progress = Math.min(1, adjustedFrame / effectiveDuration);
        const easedProgress = easeOutCubic(progress);

        const barHeight = easedProgress * (bar.value / max) * maxHeight;
        const labelOpacity = Math.min(1, adjustedFrame / 12);

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              justifyContent: 'flex-end',
            }}
          >
            {/* 数值标签 */}
            <span
              style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: 700,
                opacity: labelOpacity,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                minHeight: 28,
                display: 'block',
              }}
            >
              {bar.value.toLocaleString('zh-CN')}
            </span>

            {/* 柱子本体 */}
            <div
              style={{
                width: barWidth,
                height: Math.max(barHeight, 2),
                backgroundColor: bar.color,
                borderRadius: '6px 6px 0 0',
              }}
            />

            {/* 底部标签 */}
            <span
              style={{
                color: '#94a3b8',
                fontSize: 18,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                opacity: labelOpacity,
              }}
            >
              {bar.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
