import { registerTemplate } from '../registry';
import type { VideoTemplate } from '../types';
import { MetricShowcase, MetricShowcasePropsSchema } from './MetricShowcase';

const metricShowcase: VideoTemplate<typeof MetricShowcasePropsSchema> = {
  id: 'metric-showcase',
  name: '单指标展示',
  description: '高亮展示单个 KPI 指标，含品牌名、计数动画和上下文说明，适合社交媒体方形格式',
  tags: ['指标', 'KPI', '数据', '社交媒体'],
  thumbnail: '/thumbnails/metric-showcase.png',

  schema: MetricShowcasePropsSchema,
  defaultProps: {
    brandName: 'ACME Corp',
    metricLabel: '月活用户',
    metricValue: 1200000,
    metricPrefix: '',
    metricSuffix: '',
    contextLine: '同比增长 68%，创历史新高',
    bgColor: '#0a0a0a',
    brandColor: '#6366f1',
    metricColor: '#ffffff',
    labelColor: '#6366f1',
    contextColor: '#94a3b8',
    brandFontSize: 36,
    metricFontSize: 120,
    labelFontSize: 24,
    contextFontSize: 28,
  },

  fieldMeta: {
    // 内容组
    brandName: { label: '品牌名称', group: 'content', control: 'text', order: 1 },
    metricLabel: { label: '指标标签', group: 'content', control: 'text', order: 2, description: '如"月活用户"' },
    metricValue: { label: '指标数值', group: 'content', control: 'number', order: 3, min: 0, step: 1000 },
    metricPrefix: { label: '数值前缀', group: 'content', control: 'text', order: 4, description: '如"¥"、"$"，留空则不显示' },
    metricSuffix: { label: '数值后缀', group: 'content', control: 'text', order: 5, description: '如"%"、"万"，留空则不显示' },
    contextLine: { label: '上下文说明', group: 'content', control: 'text', order: 6, description: '如"同比增长 68%"' },

    // 样式组 — 颜色
    bgColor: { label: '背景颜色', group: 'style', control: 'color', order: 1 },
    brandColor: { label: '品牌名颜色', group: 'style', control: 'color', order: 2 },
    metricColor: { label: '数值颜色', group: 'style', control: 'color', order: 3 },
    labelColor: { label: '标签颜色', group: 'style', control: 'color', order: 4 },
    contextColor: { label: '说明文字颜色', group: 'style', control: 'color', order: 5 },

    // 样式组 — 字号
    brandFontSize: { label: '品牌名字号', group: 'style', control: 'slider', order: 6, min: 20, max: 72, step: 2 },
    metricFontSize: { label: '数值字号', group: 'style', control: 'slider', order: 7, min: 60, max: 200, step: 4 },
    labelFontSize: { label: '标签字号', group: 'style', control: 'slider', order: 8, min: 14, max: 48, step: 1 },
    contextFontSize: { label: '说明字号', group: 'style', control: 'slider', order: 9, min: 14, max: 48, step: 1 },
  },

  component: MetricShowcase,

  composition: {
    width: 1080,
    height: 1080,
    fps: 30,
    durationInFrames: 150,
  },
};

registerTemplate(metricShowcase);

export { MetricShowcase, MetricShowcasePropsSchema };
export default metricShowcase;
