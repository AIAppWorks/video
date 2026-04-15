import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { TypeWriter } from '../../../components/TypeWriter';
import { FadeIn } from '../../../components/FadeIn';
import { SlideIn } from '../../../components/SlideIn';
import { ShineSweep } from '../../../components/ShineSweep';
import { easeOutCubic } from '../../../utils/easing';
import type { ModelNamesProps } from '../ModelNames';

export const Scene7Mythos: React.FC<ModelNamesProps> = ({
  s7ModelName,
  s7Origin,
  s7Tagline,
  mythosColor,
  subtextColor,
}) => {
  const frame = useCurrentFrame();

  const bgPulse = interpolate(frame, [0, 40], [0, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nameLocalFrame = Math.max(frame - 10, 0);
  const nameProgress = Math.min(nameLocalFrame / 30, 1);
  const nameEased = easeOutCubic(nameProgress);
  const nameScale = 1.5 - 0.5 * nameEased;
  const nameOpacity = interpolate(nameLocalFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ringFrame = Math.max(frame - 60, 0);
  const ringProgress = Math.min(ringFrame / 30, 1);
  const ringEased = easeOutCubic(ringProgress);
  const ringSize = ringEased * 300;
  const ringOpacity = ringFrame > 0
    ? interpolate(ringFrame, [0, 10, 30], [0, 0.5, 0.25], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <AbsoluteFill>
      {/* Background radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, ${mythosColor}40 0%, transparent 60%)`,
          opacity: bgPulse,
        }}
      />

      {/* Greek watermark */}
      <Sequence from={5} durationInFrames={175}>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={30}>
            <span
              style={{
                fontSize: 160,
                fontWeight: 200,
                color: mythosColor,
                opacity: 0.06,
                letterSpacing: '0.05em',
              }}
            >
              {'\u039C\u1FE6\u03B8\u03BF\u03C2'}
            </span>
          </FadeIn>
        </div>
      </Sequence>

      {/* Model name - zoom reverse */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          width: '100%',
          textAlign: 'center',
          transform: `scale(${nameScale})`,
          opacity: nameOpacity,
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: mythosColor,
            letterSpacing: '0.1em',
          }}
        >
          {s7ModelName}
        </span>
      </div>

      {/* Expanding ring */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `2px solid ${mythosColor}`,
          opacity: ringOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Origin - TypeWriter */}
      <Sequence from={35} durationInFrames={145}>
        <div
          style={{
            position: 'absolute',
            top: '58%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <TypeWriter
            text={s7Origin}
            durationFrames={25}
            cursorColor={mythosColor}
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: subtextColor,
              letterSpacing: '0.1em',
            }}
          />
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={70} durationInFrames={110}>
        <div
          style={{
            position: 'absolute',
            top: '72%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={20}>
            <SlideIn durationFrames={22} direction="down" distance={25}>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: mythosColor,
                  margin: 0,
                  letterSpacing: '0.08em',
                }}
              >
                {s7Tagline}
              </p>
            </SlideIn>
          </FadeIn>
        </div>
      </Sequence>

      {/* Anticipation */}
      <Sequence from={90} durationInFrames={90}>
        <div
          style={{
            position: 'absolute',
            top: '85%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={18}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 400,
                color: subtextColor,
                margin: 0,
                letterSpacing: '0.2em',
              }}
            >
              ...
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Shine sweep */}
      <Sequence from={95} durationInFrames={30}>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '80%',
            height: '30%',
          }}
        >
          <ShineSweep
            durationFrames={28}
            bandWidth={20}
            color={`${mythosColor}50`}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
