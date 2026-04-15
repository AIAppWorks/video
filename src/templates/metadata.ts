/**
 * 模板元数据（纯数据，无 Remotion 依赖）
 * 供 Server Component 使用，避免 Remotion 在服务端 RSC 中初始化报错
 */
export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string;
  composition: {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
  };
}

const allMetadata: TemplateMetadata[] = [
  {
    id: 'growth-video-lite',
    name: '数据增长叙事',
    description: '展示两组数据的对比增长，含计数动画、柱状图和增长倍率',
    tags: ['数据', '增长', '对比', '柱状图'],
    thumbnail: '/thumbnails/growth-video-lite.png',
    composition: { width: 1280, height: 720, fps: 30, durationInFrames: 210 },
  },
  {
    id: 'metric-showcase',
    name: '单指标展示',
    description: '高亮展示单个 KPI 指标，含品牌名、计数动画和上下文说明，适合社交媒体方形格式',
    tags: ['指标', 'KPI', '数据', '社交媒体'],
    thumbnail: '/thumbnails/metric-showcase.png',
    composition: { width: 1080, height: 1080, fps: 30, durationInFrames: 150 },
  },
  {
    id: 'before-after',
    name: '前后对比',
    description: '左右分屏对比展示变化前后的差异，分割线动态滑入揭示效果',
    tags: ['对比', '前后', '改进', '展示'],
    thumbnail: '/thumbnails/before-after.png',
    composition: { width: 1280, height: 720, fps: 30, durationInFrames: 180 },
  },
  {
    id: 'model-names',
    name: 'AI 模型命名溯源',
    description: '6 个场景解读 Anthropic AI 模型命名（Opus/Sonnet/Haiku/Mythos）的文化内涵',
    tags: ['教育', 'AI', 'Anthropic', '文化', '命名'],
    thumbnail: '/thumbnails/model-names.png',
    composition: { width: 1280, height: 720, fps: 30, durationInFrames: 180 },
  },
];

export function getAllTemplateMetadata(): TemplateMetadata[] {
  return allMetadata;
}

export function getTemplateMetadata(id: string): TemplateMetadata | undefined {
  return allMetadata.find((t) => t.id === id);
}
