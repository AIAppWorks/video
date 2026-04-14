import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { z } from 'zod';
import { FadeIn } from '../../components/FadeIn';
import { AnimatedNumber } from '../../components/AnimatedNumber';

export const MetricShowcasePropsSchema = z.object({
  brandName: z.string(),
  metricLabel: z.string(),
  metricValue: z.number(),
  metricPrefix: z.string(),
  metricSuffix: z.string(),
  contextLine: z.string(),
  bgColor: z.string(),
  brandColor: z.string(),
  metricColor: z.string(),
  labelColor: z.string(),
  contextColor: z.string(),
  brandFontSize: z.number(),
  metricFontSize: z.number(),
  labelFontSize: z.number(),
  contextFontSize: z.number(),
});

type MetricShowcaseProps = z.infer<typeof MetricShowcasePropsSchema>;

/**
 * MetricShowcase — 单 KPI 指标展示
 *
 * 帧时间轴：
 *   0  – 30  : 品牌名淡入
 *   30 – 100 : 指标标签 + 数字计数动画
 *   100– 150 : 上下文说明滑入
 *
 * 总长 150 帧 @ 30fps = 5 秒
 * 规格：1280x720（16:9 横版）
 */
export const MetricShowcase: React.FC<MetricShowcaseProps> = ({
  brandName,
  metricLabel,
  metricValue,
  metricPrefix,
  metricSuffix,
  contextLine,
  bgColor,
  brandColor,
  metricColor,
  labelColor,
  contextColor,
  brandFontSize,
  metricFontSize,
  labelFontSize,
  contextFontSize,
}) => {
  const bg: React.CSSProperties = {
    backgroundColor: bgColor,
    fontFamily: 'system-ui, -apple-system, "PingFang SC", "Hiragino Sans GB", sans-serif',
  };

  const center: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  return (
    <AbsoluteFill style={bg}>
      {/* Segment 1: 品牌名（帧 0–30） */}
      <Sequence from={0} durationInFrames={30}>
        <AbsoluteFill style={center}>
          <FadeIn durationFrames={25}>
            <span
              style={{
                fontSize: brandFontSize,
                fontWeight: 700,
                color: brandColor,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {brandName}
            </span>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Segment 2: 指标标签 + 数字计数（帧 30–100） */}
      <Sequence from={30} durationInFrames={70}>
        <AbsoluteFill style={{ ...center, gap: 24 }}>
          <FadeIn durationFrames={15}>
            <p
              style={{
                fontSize: labelFontSize,
                color: labelColor,
                margin: 0,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              {metricLabel}
            </p>
          </FadeIn>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {metricPrefix ? (
              <span style={{ fontSize: metricFontSize * 0.5, color: metricColor, fontWeight: 700 }}>
                {metricPrefix}
              </span>
            ) : null}
            <AnimatedNumber
              target={metricValue}
              durationFrames={55}
              style={{
                fontSize: metricFontSize,
                fontWeight: 900,
                color: metricColor,
                lineHeight: 1,
              }}
            />
            {metricSuffix ? (
              <span style={{ fontSize: metricFontSize * 0.4, color: metricColor, fontWeight: 700 }}>
                {metricSuffix}
              </span>
            ) : null}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Segment 3: 上下文说明（帧 100–150） */}
      <Sequence from={100} durationInFrames={50}>
        <AbsoluteFill style={center}>
          <FadeIn durationFrames={30}>
            <p
              style={{
                fontSize: contextFontSize,
                color: contextColor,
                margin: 0,
                letterSpacing: '0.04em',
                textAlign: 'center',
                padding: '0 80px',
              }}
            >
              {contextLine}
            </p>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
