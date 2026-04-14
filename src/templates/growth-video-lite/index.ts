import { registerTemplate } from '../registry';
import type { VideoTemplate } from '../types';
import { GrowthVideoLite, GrowthVideoPropsSchema } from './GrowthVideoLite';

const growthVideoLite: VideoTemplate<typeof GrowthVideoPropsSchema> = {
  id: 'growth-video-lite',
  name: '数据增长叙事',
  description: '展示两组数据的对比增长，含计数动画、柱状图和增长倍率',
  tags: ['数据', '增长', '对比', '柱状图'],
  thumbnail: '/thumbnails/growth-video-lite.png',

  schema: GrowthVideoPropsSchema,
  defaultProps: {
    title: '用户增长叙事',
    value1: 12000,
    value2: 87000,
    label1: '去年',
    label2: '今年',
    bgColor: '#0f172a',
    titleColor: '#ffffff',
    accentColor: '#3b82f6',
    value1Color: '#60a5fa',
    value2Color: '#4ade80',
    bar1Color: '#3b82f6',
    bar2Color: '#22c55e',
    growthRateColor: '#fbbf24',
    titleFontSize: 72,
    labelFontSize: 22,
    numberFontSize: 96,
    growthRateFontSize: 128,
    titleDurationFrames: 30,
    numberDurationFrames: 35,
    chartDurationFrames: 55,
  },

  fieldMeta: {
    // 内容组
    title: { label: '标题文字', group: 'content', control: 'text', order: 1 },
    label1: { label: '数据1标签', group: 'content', control: 'text', order: 2, description: '如"去年"' },
    value1: { label: '数据1数值', group: 'content', control: 'number', order: 3, min: 0, step: 100 },
    label2: { label: '数据2标签', group: 'content', control: 'text', order: 4, description: '如"今年"' },
    value2: { label: '数据2数值', group: 'content', control: 'number', order: 5, min: 0, step: 100 },

    // 样式组 — 颜色
    bgColor: { label: '背景颜色', group: 'style', control: 'color', order: 1 },
    titleColor: { label: '标题颜色', group: 'style', control: 'color', order: 2 },
    accentColor: { label: '强调色', group: 'style', control: 'color', order: 3 },
    value1Color: { label: '数据1颜色', group: 'style', control: 'color', order: 4 },
    value2Color: { label: '数据2颜色', group: 'style', control: 'color', order: 5 },
    bar1Color: { label: '柱子1颜色', group: 'style', control: 'color', order: 6 },
    bar2Color: { label: '柱子2颜色', group: 'style', control: 'color', order: 7 },
    growthRateColor: { label: '增长率颜色', group: 'style', control: 'color', order: 8 },

    // 样式组 — 字号
    titleFontSize: { label: '标题字号', group: 'style', control: 'slider', order: 9, min: 36, max: 120, step: 2 },
    labelFontSize: { label: '标签字号', group: 'style', control: 'slider', order: 10, min: 14, max: 48, step: 1 },
    numberFontSize: { label: '数字字号', group: 'style', control: 'slider', order: 11, min: 48, max: 160, step: 2 },
    growthRateFontSize: { label: '增长率字号', group: 'style', control: 'slider', order: 12, min: 64, max: 200, step: 2 },

    // 动画组
    titleDurationFrames: { label: '标题动画时长', group: 'animation', control: 'slider', order: 1, min: 10, max: 60, step: 5, description: '帧数（30帧=1秒）' },
    numberDurationFrames: { label: '数字动画时长', group: 'animation', control: 'slider', order: 2, min: 15, max: 60, step: 5, description: '帧数（30帧=1秒）' },
    chartDurationFrames: { label: '柱状图动画时长', group: 'animation', control: 'slider', order: 3, min: 20, max: 90, step: 5, description: '帧数（30帧=1秒）' },
  },

  component: GrowthVideoLite,

  composition: {
    width: 1280,
    height: 720,
    fps: 30,
    durationInFrames: 210,
  },
};

registerTemplate(growthVideoLite);

export { GrowthVideoLite, GrowthVideoPropsSchema };
export default growthVideoLite;
