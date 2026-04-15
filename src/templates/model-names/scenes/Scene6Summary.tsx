import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { FadeIn } from '../../../components/FadeIn';
import { LineReveal } from '../../../components/LineReveal';
import { ShineSweep } from '../../../components/ShineSweep';
import { easeOutCubic } from '../../../utils/easing';
import type { ModelNamesProps } from '../ModelNames';

interface ColumnProps {
  name: string;
  description: string;
  color: string;
  delay: number;
  subtextColor: string;
}

const ModelColumn: React.FC<ColumnProps> = ({
  name,
  description,
  color,
  delay,
  subtextColor,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;
  const progress = Math.min(Math.max(localFrame / 25, 0), 1);
  const easedProgress = easeOutCubic(progress);

  const translateY = (1 - easedProgress) * 60;
  const opacity = Math.min(progress * 2, 1);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          height: 4,
          backgroundColor: color,
          borderRadius: 2,
        }}
      />
      <span
        style={{
          fontSize: 48,
          fontWeight: 800,
          color,
          letterSpacing: '0.05em',
        }}
      >
        {name}
      </span>
      <p
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: subtextColor,
          margin: 0,
          textAlign: 'center',
          letterSpacing: '0.04em',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const Scene6Summary: React.FC<ModelNamesProps> = ({
  s6Title,
  s6OpusLine,
  s6SonnetLine,
  s6HaikuLine,
  opusColor,
  sonnetColor,
  haikuColor,
  textColor,
  subtextColor,
}) => {
  return (
    <AbsoluteFill>
      {/* Title */}
      <Sequence from={0} durationInFrames={180}>
        <div
          style={{
            position: 'absolute',
            top: '8%',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <FadeIn durationFrames={20}>
            <h1
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: textColor,
                margin: 0,
                letterSpacing: '0.05em',
              }}
            >
              {s6Title}
            </h1>
          </FadeIn>
        </div>
      </Sequence>

      {/* Three columns */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <ModelColumn
          name="Opus"
          description={s6OpusLine}
          color={opusColor}
          delay={15}
          subtextColor={subtextColor}
        />
        <ModelColumn
          name="Sonnet"
          description={s6SonnetLine}
          color={sonnetColor}
          delay={28}
          subtextColor={subtextColor}
        />
        <ModelColumn
          name="Haiku"
          description={s6HaikuLine}
          color={haikuColor}
          delay={41}
          subtextColor={subtextColor}
        />
      </div>

      {/* Connecting line */}
      <Sequence from={65} durationInFrames={115}>
        <div
          style={{
            position: 'absolute',
            top: '78%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LineReveal
            width={900}
            color={subtextColor}
            strokeWidth={1}
            durationFrames={25}
            fromCenter
          />
        </div>
      </Sequence>

      {/* Evolution label */}
      <Sequence from={80} durationInFrames={100}>
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
                fontSize: 18,
                fontWeight: 400,
                color: subtextColor,
                margin: 0,
                letterSpacing: '0.15em',
              }}
            >
              Haiku &rarr; Sonnet &rarr; Opus
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
            left: '5%',
            width: '90%',
            height: '55%',
          }}
        >
          <ShineSweep durationFrames={30} bandWidth={18} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
