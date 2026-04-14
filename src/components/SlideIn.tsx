import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { easeOutCubic } from '../utils/easing';

type Direction = 'left' | 'right' | 'up' | 'down';

interface SlideInProps {
  children: React.ReactNode;
  /** 动画持续帧数，默认 25 */
  durationFrames?: number;
  /** 滑入方向，默认 'left'（从左滑入） */
  direction?: Direction;
  /** 滑动距离（px），默认 120 */
  distance?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * SlideIn — 从指定方向滑入的动画组件
 * 同时带有淡入效果，使动画更自然
 */
export const SlideIn: React.FC<SlideInProps> = ({
  children,
  durationFrames = 25,
  direction = 'left',
  distance = 120,
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  const rawProgress = Math.min(frame / durationFrames, 1);
  const progress = easeOutCubic(rawProgress);

  const offset = (1 - progress) * distance;

  const translateMap: Record<Direction, string> = {
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
    up: `translateY(-${offset}px)`,
    down: `translateY(${offset}px)`,
  };

  const opacity = interpolate(frame, [0, durationFrames * 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: translateMap[direction],
        opacity,
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
