import React from 'react';
import { useCurrentFrame } from 'remotion';
import { easeOutCubic } from '../utils/easing';

interface AnimatedNumberProps {
  /** 目标数字 */
  target: number;
  /** 动画持续帧数，默认 35 */
  durationFrames?: number;
  /** 数字前缀，例如 "¥" */
  prefix?: string;
  /** 数字后缀，例如 "%" */
  suffix?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * AnimatedNumber —— 数字从 0 → target 的 easeOutCubic 动画
 * 在 Sequence 内使用时，frame 从 0 开始计
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  durationFrames = 35,
  prefix = '',
  suffix = '',
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  const progress = Math.min(frame / durationFrames, 1);
  const easedProgress = easeOutCubic(progress);
  const currentValue = Math.round(easedProgress * target);

  return (
    <span style={style} className={className}>
      {prefix}
      {currentValue.toLocaleString('zh-CN')}
      {suffix}
    </span>
  );
};
