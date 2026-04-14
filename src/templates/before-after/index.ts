import { registerTemplate } from '../registry';
import type { VideoTemplate } from '../types';
import { BeforeAfter, BeforeAfterPropsSchema } from './BeforeAfter';

const beforeAfter: VideoTemplate<typeof BeforeAfterPropsSchema> = {
  id: 'before-after',
  name: '前后对比',
  description: '左右分屏对比展示变化前后的差异，分割线动态滑入揭示效果',
  tags: ['对比', '前后', '改进', '展示'],
  thumbnail: '/thumbnails/before-after.png',

  schema: BeforeAfterPropsSchema,
  defaultProps: {
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeValue: '手动处理，3天完成',
    afterValue: '自动化，10分钟完成',
    summaryText: '效率提升 432 倍',
    bgColor: '#0f172a',
    beforeBgColor: '#1e293b',
    afterBgColor: '#0f3460',
    beforeTextColor: '#94a3b8',
    afterTextColor: '#e2e8f0',
    dividerColor: '#3b82f6',
    summaryColor: '#fbbf24',
    labelFontSize: 28,
    valueFontSize: 52,
    summaryFontSize: 36,
  },

  fieldMeta: {
    // 内容组
    beforeLabel: { label: 'Before 标签', group: 'content', control: 'text', order: 1 },
    beforeValue: { label: 'Before 内容', group: 'content', control: 'textarea', order: 2 },
    afterLabel: { label: 'After 标签', group: 'content', control: 'text', order: 3 },
    afterValue: { label: 'After 内容', group: 'content', control: 'textarea', order: 4 },
    summaryText: { label: '底部总结', group: 'content', control: 'text', order: 5 },

    // 样式组 — 颜色
    bgColor: { label: '页面背景色', group: 'style', control: 'color', order: 1 },
    beforeBgColor: { label: 'Before 背景色', group: 'style', control: 'color', order: 2 },
    afterBgColor: { label: 'After 背景色', group: 'style', control: 'color', order: 3 },
    beforeTextColor: { label: 'Before 文字颜色', group: 'style', control: 'color', order: 4 },
    afterTextColor: { label: 'After 文字颜色', group: 'style', control: 'color', order: 5 },
    dividerColor: { label: '分割线颜色', group: 'style', control: 'color', order: 6 },
    summaryColor: { label: '总结文字颜色', group: 'style', control: 'color', order: 7 },

    // 样式组 — 字号
    labelFontSize: { label: '标签字号', group: 'style', control: 'slider', order: 8, min: 16, max: 56, step: 2 },
    valueFontSize: { label: '内容字号', group: 'style', control: 'slider', order: 9, min: 24, max: 96, step: 2 },
    summaryFontSize: { label: '总结字号', group: 'style', control: 'slider', order: 10, min: 16, max: 60, step: 2 },
  },

  component: BeforeAfter,

  composition: {
    width: 1280,
    height: 720,
    fps: 30,
    durationInFrames: 180,
  },
};

registerTemplate(beforeAfter);

export { BeforeAfter, BeforeAfterPropsSchema };
export default beforeAfter;
