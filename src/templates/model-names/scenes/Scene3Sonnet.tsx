import React from 'react';
import { AbsoluteFill, useCurrentFrame, Sequence } from 'remotion';
import { SlideIn } from '../../../components/SlideIn';
import { TypeWriter } from '../../../components/TypeWriter';
import { FadeIn } from '../../../components/FadeIn';
import { ShineSweep } from '../../../components/ShineSweep';
import { easeOutCubic } from '../../../utils/easing';
import type { ModelNamesProps } from '../ModelNames';

const LINE_WIDTHS = [95, 110, 85, 100, 105, 88, 115, 92, 108, 82, 98, 112, 90, 103];

const SonnetLines: React.FC<{ color: string; startFrame: number }> = ({
  color,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const groups = [4, 4, 3, 3];
  let lineIndex = 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'flex-end',
      }}
    >
      {groups.map((count, groupIdx) => (
        <div
          key={groupIdx}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            marginBottom: groupIdx < 3 ? 8 : 0,
          }}
        >
          {Array.from({ length: count }).map((_, i) => {
            const idx = lineIndex++;
            const lineDelay = startFrame + idx * 2;
            const localFrame = frame - lineDelay;
            const progress = Math.min(Math.max(localFrame / 12, 0), 1);
            const width = easeOutCubic(progress) * LINE_WIDTHS[idx];
            const opacity = Math.min(progress * 2, 1);

            return (
              <div
                key={i}
                style={{
                  height: 2,
                  width,
                  backgroundColor: color,
                  opacity: opacity * 0.5,
                  borderRadius: 1,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const Scene3Sonnet: React.FC<ModelNamesProps> = ({
  s3ModelName,
  s3Origin,
  s3Detail1,
  s3Detail2,
  s3Tagline,
  sonnetColor,
  textColor,
  subtextColor,
}) => {
  return (
    <AbsoluteFill>
      {/* Model name */}
      <Sequence from={0} durationInFrames={180}>
        <div style={{ position: 'absolute', top: '12%', left: 100 }}>
          <SlideIn durationFrames={25} direction="left" distance={100}>
            <span
              style={{
                fontSize: 100,
                fontWeight: 900,
                color: sonnetColor,
                letterSpacing: '0.06em',
              }}
            >
              {s3ModelName}
            </span>
          </SlideIn>
        </div>
      </Sequence>

      {/* 14 lines visual */}
      <Sequence from={20} durationInFrames={160}>
        <div style={{ position: 'absolute', top: '15%', right: 100 }}>
          <SonnetLines color={sonnetColor} startFrame={0} />
        </div>
      </Sequence>

      {/* Origin - TypeWriter */}
      <Sequence from={20} durationInFrames={160}>
        <div style={{ position: 'absolute', top: '42%', left: 100 }}>
          <TypeWriter
            text={s3Origin}
            durationFrames={25}
            cursorColor={sonnetColor}
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: subtextColor,
              letterSpacing: '0.08em',
            }}
          />
        </div>
      </Sequence>

      {/* Shakespeare reference */}
      <Sequence from={50} durationInFrames={130}>
        <div style={{ position: 'absolute', top: '55%', left: 100 }}>
          <FadeIn durationFrames={20}>
            <SlideIn durationFrames={22} direction="down" distance={30}>
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: textColor,
                  margin: 0,
                  letterSpacing: '0.03em',
                }}
              >
                {s3Detail1}
              </p>
            </SlideIn>
          </FadeIn>
        </div>
      </Sequence>

      {/* "Dancing in chains" */}
      <Sequence from={65} durationInFrames={115}>
        <div
          style={{
            position: 'absolute',
            top: '67%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={25}>
            <p
              style={{
                fontSize: 30,
                fontWeight: 600,
                fontStyle: 'italic',
                color: sonnetColor,
                margin: 0,
                letterSpacing: '0.05em',
              }}
            >
              &ldquo;{s3Detail2}&rdquo;
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={85} durationInFrames={95}>
        <div
          style={{
            position: 'absolute',
            top: '82%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={18}>
            <p
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: subtextColor,
                margin: 0,
                letterSpacing: '0.1em',
              }}
            >
              {s3Tagline}
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Shine sweep */}
      <Sequence from={95} durationInFrames={25}>
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: 0,
            width: '60%',
            height: '25%',
          }}
        >
          <ShineSweep
            durationFrames={25}
            bandWidth={22}
            color={`${sonnetColor}40`}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
