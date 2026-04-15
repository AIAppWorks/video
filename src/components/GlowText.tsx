import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface GlowTextProps {
  children: React.ReactNode;
  glowColor: string;
  /** 辉光从 0 到满的帧数，默认 25 */
  durationFrames?: number;
  /** 最大模糊半径 px，默认 20 */
  maxBlur?: number;
  style?: React.CSSProperties;
}

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  glowColor,
  durationFrames = 25,
  maxBlur = 20,
  style,
}) => {
  const frame = useCurrentFrame();

  const blur = interpolate(frame, [0, durationFrames], [0, maxBlur], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textShadow = [
    `0 0 ${blur * 0.5}px ${glowColor}`,
    `0 0 ${blur}px ${glowColor}`,
    `0 0 ${blur * 2}px ${glowColor}80`,
    `0 0 ${blur * 3}px ${glowColor}40`,
  ].join(', ');

  return (
    <div style={{ textShadow, ...style }}>
      {children}
    </div>
  );
};
