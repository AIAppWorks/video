import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface FadeInProps {
  children: React.ReactNode;
  /** 淡入持续帧数，默认 20 帧 */
  durationFrames?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * FadeIn —— 在 durationFrames 内将 opacity 从 0 → 1
 * 使用 useCurrentFrame()，必须在 Remotion Composition 内部使用
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  durationFrames = 20,
  className,
  style,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity, ...style }} className={className}>
      {children}
    </div>
  );
};
