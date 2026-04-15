import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { FadeIn } from '../../../components/FadeIn';
import { ScaleIn } from '../../../components/ScaleIn';
import { TypeWriter } from '../../../components/TypeWriter';
import { SlideIn } from '../../../components/SlideIn';
import { AnimatedNumber } from '../../../components/AnimatedNumber';
import { LineReveal } from '../../../components/LineReveal';
import { ShineSweep } from '../../../components/ShineSweep';
import type { ModelNamesProps } from '../ModelNames';

export const Scene4Haiku: React.FC<ModelNamesProps> = ({
  s4ModelName,
  s4Origin,
  s4Detail1,
  s4Detail2,
  s4Tagline,
  haikuColor,
  textColor,
  subtextColor,
}) => {
  const syllables = [
    { num: '5', delay: 15 },
    { num: '7', delay: 25 },
    { num: '5', delay: 35 },
  ];

  return (
    <AbsoluteFill>
      {/* Model name - minimal fade in (zen-like) */}
      <Sequence from={0} durationInFrames={180}>
        <div
          style={{
            position: 'absolute',
            top: '10%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={25}>
            <span
              style={{
                fontSize: 100,
                fontWeight: 900,
                color: haikuColor,
                letterSpacing: '0.1em',
              }}
            >
              {s4ModelName}
            </span>
          </FadeIn>
        </div>
      </Sequence>

      {/* 5-7-5 syllable numbers */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 50,
          alignItems: 'center',
        }}
      >
        {syllables.map((s, i) => (
          <React.Fragment key={i}>
            <ScaleIn durationFrames={20} delay={s.delay}>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  color: textColor,
                  lineHeight: 1,
                }}
              >
                {s.num}
              </span>
            </ScaleIn>
            {i < syllables.length - 1 && (
              <ScaleIn durationFrames={15} delay={s.delay + 5}>
                <span
                  style={{
                    fontSize: 36,
                    color: subtextColor,
                    fontWeight: 300,
                  }}
                >
                  -
                </span>
              </ScaleIn>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* = 17 syllables */}
      <Sequence from={45} durationInFrames={135}>
        <div
          style={{
            position: 'absolute',
            top: '52%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 28, color: subtextColor }}>=</span>
          <AnimatedNumber
            target={17}
            durationFrames={20}
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: haikuColor,
              lineHeight: 1,
              display: 'inline-block',
            }}
          />
          <FadeIn durationFrames={15}>
            <span
              style={{
                fontSize: 22,
                color: subtextColor,
                letterSpacing: '0.08em',
              }}
            >
              音节
            </span>
          </FadeIn>
        </div>
      </Sequence>

      {/* Basho reference with decorative lines */}
      <Sequence from={60} durationInFrames={120}>
        <div
          style={{
            position: 'absolute',
            top: '65%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <LineReveal width={200} color={haikuColor} strokeWidth={1} durationFrames={15} fromCenter />
          <SlideIn durationFrames={18} direction="down" distance={20}>
            <p
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: textColor,
                margin: '6px 0',
                letterSpacing: '0.05em',
              }}
            >
              {s4Detail1}
            </p>
          </SlideIn>
          <LineReveal width={200} color={haikuColor} strokeWidth={1} durationFrames={15} fromCenter />
        </div>
      </Sequence>

      {/* Famous haiku - TypeWriter */}
      <Sequence from={75} durationInFrames={105}>
        <div
          style={{
            position: 'absolute',
            top: '78%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <TypeWriter
            text={s4Detail2}
            durationFrames={25}
            cursorColor={haikuColor}
            style={{
              fontSize: 20,
              fontWeight: 400,
              fontStyle: 'italic',
              color: subtextColor,
              letterSpacing: '0.04em',
            }}
          />
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={95} durationInFrames={85}>
        <div
          style={{
            position: 'absolute',
            top: '88%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={15}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: haikuColor,
                margin: 0,
                letterSpacing: '0.12em',
              }}
            >
              {s4Tagline}
            </p>
          </FadeIn>
        </div>
      </Sequence>

      {/* Shine sweep */}
      <Sequence from={100} durationInFrames={25}>
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '15%',
            width: '70%',
            height: '25%',
          }}
        >
          <ShineSweep
            durationFrames={25}
            bandWidth={20}
            color={`${haikuColor}40`}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
