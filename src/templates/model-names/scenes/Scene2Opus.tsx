import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { ScaleIn } from '../../../components/ScaleIn';
import { SlideIn } from '../../../components/SlideIn';
import { FadeIn } from '../../../components/FadeIn';
import { ShineSweep } from '../../../components/ShineSweep';
import type { ModelNamesProps } from '../ModelNames';

export const Scene2Opus: React.FC<ModelNamesProps> = ({
  s2ModelName,
  s2Origin,
  s2Detail1,
  s2Detail2,
  s2Tagline,
  opusColor,
  textColor,
  subtextColor,
}) => {
  const frame = useCurrentFrame();

  const flashOpacity = interpolate(frame, [0, 15], [0.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Radial flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 35%, ${opusColor}60 0%, transparent 70%)`,
          opacity: flashOpacity,
        }}
      />

      {/* Model name */}
      <Sequence from={5} durationInFrames={175}>
        <div
          style={{
            position: 'absolute',
            top: '12%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <ScaleIn durationFrames={28} fromScale={0.3}>
            <span
              style={{
                fontSize: 110,
                fontWeight: 900,
                color: opusColor,
                letterSpacing: '0.08em',
              }}
            >
              {s2ModelName}
            </span>
          </ScaleIn>
        </div>
      </Sequence>

      {/* Origin */}
      <Sequence from={25} durationInFrames={155}>
        <div
          style={{
            position: 'absolute',
            top: '42%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <SlideIn durationFrames={20} direction="right" distance={80}>
            <p
              style={{
                fontSize: 26,
                fontWeight: 400,
                color: subtextColor,
                margin: 0,
                letterSpacing: '0.1em',
              }}
            >
              {s2Origin}
            </p>
          </SlideIn>
        </div>
      </Sequence>

      {/* Detail 1 */}
      <Sequence from={45} durationInFrames={135}>
        <div
          style={{
            position: 'absolute',
            top: '54%',
            width: '100%',
            paddingLeft: 180,
          }}
        >
          <SlideIn durationFrames={20} direction="left" distance={60}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20, color: opusColor }}>&#9835;</span>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: textColor,
                  letterSpacing: '0.03em',
                }}
              >
                {s2Detail1}
              </span>
            </div>
          </SlideIn>
        </div>
      </Sequence>

      {/* Detail 2 */}
      <Sequence from={58} durationInFrames={122}>
        <div
          style={{
            position: 'absolute',
            top: '64%',
            width: '100%',
            paddingLeft: 180,
          }}
        >
          <SlideIn durationFrames={20} direction="left" distance={60}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20, color: opusColor }}>&#9835;</span>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: textColor,
                  letterSpacing: '0.03em',
                }}
              >
                {s2Detail2}
              </span>
            </div>
          </SlideIn>
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={75} durationInFrames={105}>
        <div
          style={{
            position: 'absolute',
            top: '80%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={20}>
            <p
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: opusColor,
                margin: 0,
                letterSpacing: '0.08em',
              }}
            >
              {s2Tagline}
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Shine sweep */}
      <Sequence from={90} durationInFrames={25}>
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: '15%',
            width: '70%',
            height: '25%',
          }}
        >
          <ShineSweep
            durationFrames={25}
            bandWidth={20}
            color={`${opusColor}50`}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
