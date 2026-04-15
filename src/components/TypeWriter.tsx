import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TypeWriterProps {
  text: string;
  /** 打字持续帧数，默认 30 */
  durationFrames?: number;
  /** 光标颜色，默认白色 */
  cursorColor?: string;
  /** 是否显示光标，默认 true */
  showCursor?: boolean;
  style?: React.CSSProperties;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  durationFrames = 30,
  cursorColor = '#ffffff',
  showCursor = true,
  style,
}) => {
  const frame = useCurrentFrame();

  const charsToShow = Math.floor(
    interpolate(frame, [0, durationFrames], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const displayText = text.slice(0, charsToShow);

  const cursorOpacity = frame <= durationFrames
    ? (Math.floor(frame / 4) % 2 === 0 ? 1 : 0)
    : 0;

  return (
    <span style={{ whiteSpace: 'pre-wrap', ...style }}>
      {displayText}
      {showCursor && (
        <span style={{ color: cursorColor, opacity: cursorOpacity }}>|</span>
      )}
    </span>
  );
};
