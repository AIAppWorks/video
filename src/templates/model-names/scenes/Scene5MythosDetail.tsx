import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { TypeWriter } from '../../../components/TypeWriter';
import { FadeIn } from '../../../components/FadeIn';
import { SlideIn } from '../../../components/SlideIn';
import { ScaleIn } from '../../../components/ScaleIn';
import { LineReveal } from '../../../components/LineReveal';
import { ShineSweep } from '../../../components/ShineSweep';
import { easeOutCubic } from '../../../utils/easing';
import type { ModelNamesProps } from '../ModelNames';

export const Scene5MythosDetail: React.FC<ModelNamesProps> = ({
  s5mModelName,
  s5mOrigin,
  s5mDetail1,
  s5mDetail2,
  s5mTagline,
  mythosColor,
  textColor,
  subtextColor,
}) => {
  const frame = useCurrentFrame();

  // Background: subtle purple radial that fades in
  const bgOpacity = interpolate(frame, [0, 50], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Expanding ring behind the title
  const ringFrame = Math.max(frame - 15, 0);
  const ringProgress = Math.min(ringFrame / 35, 1);
  const ringEased = easeOutCubic(ringProgress);
  const ringSize = ringEased * 280;
  const ringOpacity = ringFrame > 0
    ? interpolate(ringFrame, [0, 15, 35], [0, 0.4, 0.15], {
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
          background: `radial-gradient(ellipse 70% 50% at 50% 30%, ${mythosColor}35 0%, transparent 65%)`,
          opacity: bgOpacity,
        }}
      />

      {/* Expanding ring behind title */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${mythosColor}`,
          opacity: ringOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Model name */}
      <Sequence from={0} durationInFrames={180}>
        <div
          style={{
            position: 'absolute',
            top: '6%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <ScaleIn durationFrames={25} fromScale={0.5}>
            <span
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: mythosColor,
                letterSpacing: '0.08em',
              }}
            >
              {s5mModelName}
            </span>
          </ScaleIn>
        </div>
      </Sequence>

      {/* Origin line */}
      <Sequence from={15} durationInFrames={165}>
        <div
          style={{
            position: 'absolute',
            top: '28%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <SlideIn durationFrames={20} direction="right" distance={60}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: subtextColor,
                margin: 0,
                letterSpacing: '0.1em',
              }}
            >
              {s5mOrigin}
            </p>
          </SlideIn>
        </div>
      </Sequence>

      {/* Decorative line */}
      <Sequence from={30} durationInFrames={150}>
        <div
          style={{
            position: 'absolute',
            top: '38%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LineReveal
            width={500}
            color={mythosColor}
            strokeWidth={1}
            durationFrames={20}
            fromCenter
          />
        </div>
      </Sequence>

      {/* Detail 1: core meaning - TypeWriter */}
      <Sequence from={35} durationInFrames={145}>
        <div
          style={{
            position: 'absolute',
            top: '43%',
            width: '100%',
            textAlign: 'center',
            padding: '0 120px',
          }}
        >
          <TypeWriter
            text={s5mDetail1}
            durationFrames={35}
            cursorColor={mythosColor}
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: textColor,
              letterSpacing: '0.03em',
              lineHeight: '1.6',
            }}
          />
        </div>
      </Sequence>

      {/* Detail 2: what it represents */}
      <Sequence from={72} durationInFrames={108}>
        <div
          style={{
            position: 'absolute',
            top: '62%',
            width: '100%',
            textAlign: 'center',
            padding: '0 140px',
          }}
        >
          <FadeIn durationFrames={20}>
            <p
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: subtextColor,
                margin: 0,
                letterSpacing: '0.04em',
                lineHeight: '1.6',
              }}
            >
              {s5mDetail2}
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={92} durationInFrames={88}>
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
                fontSize: 22,
                fontWeight: 600,
                color: mythosColor,
                margin: 0,
                letterSpacing: '0.1em',
              }}
            >
              {s5mTagline}
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Shine sweep */}
      <Sequence from={100} durationInFrames={25}>
        <div
          style={{
            position: 'absolute',
            top: '2%',
            left: '10%',
            width: '80%',
            height: '25%',
          }}
        >
          <ShineSweep
            durationFrames={25}
            bandWidth={20}
            color={`${mythosColor}40`}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
