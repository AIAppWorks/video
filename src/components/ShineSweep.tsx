import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface ShineSweepProps {
  /** 光扫持续帧数，默认 20 */
  durationFrames?: number;
  /** 延迟帧数，默认 0 */
  delay?: number;
  /** 光扫颜色，默认白色 */
  color?: string;
  /** 光带宽度百分比，默认 30 */
  bandWidth?: number;
  style?: React.CSSProperties;
}

export const ShineSweep: React.FC<ShineSweepProps> = ({
  durationFrames = 20,
  delay = 0,
  color = 'rgba(255,255,255,0.3)',
  bandWidth = 30,
  style,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  if (localFrame < 0 || localFrame > durationFrames) {
    return null;
  }

  const progress = interpolate(localFrame, [0, durationFrames], [-100, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const halfBand = bandWidth / 2;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent 0%, transparent ${progress - halfBand}%, ${color} ${progress}%, transparent ${progress + halfBand}%, transparent 100%)`,
        }}
      />
    </div>
  );
};
