import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { easeOutElastic } from '../utils/easing';

interface ScaleInProps {
  children: React.ReactNode;
  /** 动画持续帧数，默认 30 */
  durationFrames?: number;
  /** 延迟帧数，默认 0 */
  delay?: number;
  /** 起始缩放值，默认 0 */
  fromScale?: number;
  style?: React.CSSProperties;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  durationFrames = 30,
  delay = 0,
  fromScale = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  if (localFrame < 0) {
    return <div style={{ opacity: 0, ...style }}>{children}</div>;
  }

  const rawProgress = Math.min(localFrame / durationFrames, 1);
  const elasticProgress = easeOutElastic(rawProgress);
  const scale = fromScale + (1 - fromScale) * elasticProgress;

  const opacity = interpolate(localFrame, [0, durationFrames * 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
