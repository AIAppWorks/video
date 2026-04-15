import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { TypeWriter } from '../../../components/TypeWriter';
import { ScaleIn } from '../../../components/ScaleIn';
import { LineReveal } from '../../../components/LineReveal';
import { FadeIn } from '../../../components/FadeIn';
import { ShineSweep } from '../../../components/ShineSweep';
import { easeOutCubic } from '../../../utils/easing';
import type { ModelNamesProps } from '../ModelNames';

export const Scene1Opening: React.FC<ModelNamesProps> = ({
  s1Question,
  s1Subtitle,
  opusColor,
  sonnetColor,
  haikuColor,
  mythosColor,
  textColor,
  subtextColor,
}) => {
  const frame = useCurrentFrame();

  const models = [
    { name: 'Opus', color: opusColor, delay: 30 },
    { name: 'Sonnet', color: sonnetColor, delay: 42 },
    { name: 'Haiku', color: haikuColor, delay: 54 },
    { name: 'Mythos', color: mythosColor, delay: 66 },
  ];

  const questionShift = interpolate(frame, [28, 45], [0, -30], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const questionFade = interpolate(frame, [28, 45], [1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Question text - TypeWriter, stays visible */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          width: '100%',
          textAlign: 'center',
          transform: `translateY(${questionShift}px)`,
          opacity: questionFade,
        }}
      >
        <TypeWriter
          text={s1Question}
          durationFrames={25}
          cursorColor={opusColor}
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: textColor,
            letterSpacing: '0.06em',
          }}
        />
      </div>

      {/* Four model names */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: 50,
        }}
      >
        {models.map((m) => (
          <ScaleIn key={m.name} durationFrames={22} delay={m.delay}>
            <span
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: m.color,
                letterSpacing: '0.02em',
              }}
            >
              {m.name}
            </span>
          </ScaleIn>
        ))}
      </div>

      {/* Accent dots between names */}
      <Sequence from={80} durationInFrames={100}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 155,
          }}
        >
          {[opusColor, sonnetColor, haikuColor].map((c, i) => {
            const dotFrame = frame - 80 - i * 4;
            const dotScale = dotFrame > 0 ? easeOutCubic(Math.min(dotFrame / 10, 1)) : 0;
            return (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: c,
                  transform: `scale(${dotScale})`,
                }}
              />
            );
          })}
        </div>
      </Sequence>

      {/* Decorative center line */}
      <Sequence from={78} durationInFrames={102}>
        <div
          style={{
            position: 'absolute',
            top: '58%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LineReveal
            width={700}
            color={subtextColor}
            strokeWidth={1}
            durationFrames={30}
            fromCenter
          />
        </div>
      </Sequence>

      {/* Subtitle */}
      <Sequence from={88} durationInFrames={92}>
        <div
          style={{
            position: 'absolute',
            top: '64%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={22}>
            <p
              style={{
                fontSize: 30,
                fontWeight: 500,
                color: textColor,
                margin: 0,
                letterSpacing: '0.18em',
              }}
            >
              {s1Subtitle}
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Shine sweep */}
      <Sequence from={98} durationInFrames={30}>
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '5%',
            width: '90%',
            height: '25%',
          }}
        >
          <ShineSweep durationFrames={28} bandWidth={22} color="rgba(255,255,255,0.35)" />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
