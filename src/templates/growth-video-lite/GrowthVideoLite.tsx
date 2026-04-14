import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { z } from 'zod';
import { FadeIn } from '../../components/FadeIn';
import { AnimatedNumber } from '../../components/AnimatedNumber';
import { BarChart } from '../../components/BarChart';

export const GrowthVideoPropsSchema = z.object({
  title: z.string(),
  value1: z.number(),
  value2: z.number(),
  label1: z.string(),
  label2: z.string(),
  bgColor: z.string(),
  titleColor: z.string(),
  accentColor: z.string(),
  value1Color: z.string(),
  value2Color: z.string(),
  bar1Color: z.string(),
  bar2Color: z.string(),
  growthRateColor: z.string(),
  titleFontSize: z.number(),
  labelFontSize: z.number(),
  numberFontSize: z.number(),
  growthRateFontSize: z.number(),
  titleDurationFrames: z.number(),
  numberDurationFrames: z.number(),
  chartDurationFrames: z.number(),
});

type GrowthVideoProps = z.infer<typeof GrowthVideoPropsSchema>;

/**
 * GrowthVideoLite — 增长叙事视频主组件
 *
 * 帧时间轴：
 *   0   – 30  : 标题淡入
 *   30  – 70  : value1 数字增长动画
 *   70  – 110 : value2 数字增长动画
 *   110 – 170 : 柱状图对比
 *   170 – 210 : 增长倍率结尾
 *
 * 总长 210 帧 @ 30fps = 7 秒
 */
export const GrowthVideoLite: React.FC<GrowthVideoProps> = ({
  title,
  value1,
  value2,
  label1,
  label2,
  bgColor,
  titleColor,
  accentColor,
  value1Color,
  value2Color,
  bar1Color,
  bar2Color,
  growthRateColor,
  titleFontSize,
  labelFontSize,
  numberFontSize,
  growthRateFontSize,
  titleDurationFrames,
  numberDurationFrames,
  chartDurationFrames,
}) => {
  const growthRate = (value2 / value1).toFixed(1);

  const bg: React.CSSProperties = {
    backgroundColor: bgColor,
    fontFamily: 'system-ui, -apple-system, "PingFang SC", "Hiragino Sans GB", sans-serif',
  };

  const centerFlex: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
  };

  return (
    <AbsoluteFill style={bg}>
      {/* Segment 1: 标题（帧 0–30） */}
      <Sequence from={0} durationInFrames={titleDurationFrames}>
        <AbsoluteFill style={centerFlex}>
          <FadeIn durationFrames={titleDurationFrames}>
            <div style={{ textAlign: 'center', padding: '0 72px' }}>
              <h1
                style={{
                  fontSize: titleFontSize,
                  fontWeight: 800,
                  color: titleColor,
                  margin: 0,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                }}
              >
                {title}
              </h1>
              <div
                style={{
                  marginTop: 20,
                  height: 4,
                  backgroundColor: accentColor,
                  borderRadius: 2,
                  width: 180,
                  margin: '20px auto 0',
                }}
              />
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Segment 2: 初始数值 value1（帧 30–70） */}
      <Sequence from={titleDurationFrames} durationInFrames={40}>
        <AbsoluteFill style={centerFlex}>
          <FadeIn durationFrames={10}>
            <p
              style={{
                fontSize: labelFontSize,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 500,
                margin: 0,
              }}
            >
              {label1}
            </p>
          </FadeIn>

          <AnimatedNumber
            target={value1}
            durationFrames={numberDurationFrames}
            style={{
              fontSize: numberFontSize,
              fontWeight: 800,
              color: value1Color,
              lineHeight: 1,
              display: 'block',
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Segment 3: 最终数值 value2（帧 70–110） */}
      <Sequence from={titleDurationFrames + 40} durationInFrames={40}>
        <AbsoluteFill style={centerFlex}>
          <FadeIn durationFrames={10}>
            <p
              style={{
                fontSize: labelFontSize,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 500,
                margin: 0,
              }}
            >
              {label2}
            </p>
          </FadeIn>

          <AnimatedNumber
            target={value2}
            durationFrames={numberDurationFrames}
            style={{
              fontSize: numberFontSize,
              fontWeight: 800,
              color: value2Color,
              lineHeight: 1,
              display: 'block',
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Segment 4: 柱状图对比（帧 110–170） */}
      <Sequence from={titleDurationFrames + 80} durationInFrames={chartDurationFrames + 5}>
        <AbsoluteFill style={{ ...centerFlex, gap: 36 }}>
          <FadeIn durationFrames={15}>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: titleColor,
                margin: 0,
                letterSpacing: '0.02em',
              }}
            >
              增长对比
            </h2>
          </FadeIn>

          <BarChart
            bars={[
              { label: label1, value: value1, color: bar1Color },
              { label: label2, value: value2, color: bar2Color },
            ]}
            durationFrames={chartDurationFrames}
            maxHeight={280}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Segment 5: 增长倍率结尾（帧 170–210） */}
      <Sequence from={titleDurationFrames + 140} durationInFrames={40}>
        <AbsoluteFill style={{ ...centerFlex, gap: 16 }}>
          <FadeIn durationFrames={12}>
            <p
              style={{
                fontSize: 24,
                color: '#94a3b8',
                letterSpacing: '0.12em',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              增长倍率
            </p>
          </FadeIn>

          <FadeIn durationFrames={22}>
            <span
              style={{
                fontSize: growthRateFontSize,
                fontWeight: 900,
                color: growthRateColor,
                lineHeight: 1,
                display: 'block',
                textAlign: 'center',
              }}
            >
              {growthRate}x
            </span>
          </FadeIn>

          <FadeIn durationFrames={35}>
            <p
              style={{
                fontSize: 20,
                color: '#475569',
                margin: 0,
                letterSpacing: '0.04em',
              }}
            >
              {value1.toLocaleString('zh-CN')} → {value2.toLocaleString('zh-CN')}
            </p>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
