import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { easeOutCubic } from '../utils/easing';

interface LineRevealProps {
  /** 线条宽度 */
  width: number;
  /** 线条颜色 */
  color: string;
  /** 线条粗细，默认 2 */
  strokeWidth?: number;
  /** 绘制持续帧数，默认 20 */
  durationFrames?: number;
  /** 从中心向两端展开，默认 false（从左到右） */
  fromCenter?: boolean;
  style?: React.CSSProperties;
}

export const LineReveal: React.FC<LineRevealProps> = ({
  width,
  color,
  strokeWidth = 2,
  durationFrames = 20,
  fromCenter = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const rawProgress = Math.min(frame / durationFrames, 1);
  const progress = easeOutCubic(rawProgress);

  if (fromCenter) {
    const halfWidth = (width * progress) / 2;
    const center = width / 2;
    return (
      <svg
        width={width}
        height={strokeWidth}
        style={style}
      >
        <line
          x1={center - halfWidth}
          y1={strokeWidth / 2}
          x2={center + halfWidth}
          y2={strokeWidth / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={strokeWidth}
      style={style}
    >
      <line
        x1={0}
        y1={strokeWidth / 2}
        x2={width}
        y2={strokeWidth / 2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={width}
        strokeDashoffset={width * (1 - progress)}
      />
    </svg>
  );
};
