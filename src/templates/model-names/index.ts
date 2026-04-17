import { registerTemplate } from '../registry';
import type { VideoTemplate } from '../types';
import { ModelNames, ModelNamesPropsSchema } from './ModelNames';

const modelNames: VideoTemplate<typeof ModelNamesPropsSchema> = {
  id: 'model-names',
  name: 'AI 模型命名溯源',
  description: '7 个场景解读 Anthropic AI 模型命名（Opus/Sonnet/Haiku/Mythos）的文化内涵',
  tags: ['教育', 'AI', 'Anthropic', '文化', '命名'],
  thumbnail: '/thumbnails/model-names.png',

  schema: ModelNamesPropsSchema,
  defaultProps: {
    scene: 1,

    // Scene 1
    s1Question: '这些名字藏着什么门道？',
    s1Subtitle: '经典文学与艺术形式',

    // Scene 2
    s2ModelName: 'OPUS（作品）',
    s2Origin: '源自拉丁语 · 作品',
    s2Detail1: 'Op.67 · 第五交响曲',
    s2Detail2: 'Op.27 · 月光奏鸣曲',
    s2Tagline: '最完整、复杂、有分量的顶级创作',

    // Scene 3
    s3ModelName: 'SONNET（十四行诗）',
    s3Origin: '固定14行 · 押韵 · 结构严谨',
    s3Detail1: '莎士比亚 · 154 首十四行诗',
    s3Detail2: '戴着镣铐跳舞',
    s3Tagline: '可控约束下的稳定优雅表达',

    // Scene 4
    s4ModelName: 'HAIKU（俳句）',
    s4Origin: '5 - 7 - 5  音节结构',
    s4Detail1: '松尾芭蕉',
    s4Detail2: '古池幽寂，蛙跃入，水音起',
    s4Tagline: '极致的压缩与高效',

    // Scene 5 - Mythos Detail
    s5mModelName: 'MYTHOS（神话）',
    s5mOrigin: '源自古希腊语 · 神话 / 叙事 / 世界观',
    s5mDetail1: '不再局限于某一种文体，而是指向人类文明最底层的故事体系与精神范式',
    s5mDetail2: '神话是用来解释世界、构建文明、承载集体想象的存在，不受既有格式束缚',
    s5mTagline: '世界观构建 · 史诗级创作 · 全新维度',

    // Scene 6 - Summary
    s6Title: '三个名字，三种表达范式',
    s6OpusLine: '顶级复杂的创作推理',
    s6SonnetLine: '日常稳定的高质量输出',
    s6HaikuLine: '快速高效的轻量化回应',

    // Scene 7 - Mythos Teaser
    s7ModelName: 'MYTHOS（神话）',
    s7Origin: '古希腊语 · 神话 / 世界观',
    s7Tagline: '全新维度 · 令人期待',

    // Style
    bgColor: '#0a0a1a',
    opusColor: '#F5A623',
    sonnetColor: '#4A90D9',
    haikuColor: '#7ED68A',
    mythosColor: '#B07CD8',
    textColor: '#E8E8E8',
    subtextColor: '#8A8A9A',
  },

  fieldMeta: {
    scene: {
      label: '场景选择',
      group: 'content',
      control: 'select',
      order: 0,
      options: [
        { label: '1 - 开场', value: 1 },
        { label: '2 - Opus', value: 2 },
        { label: '3 - Sonnet', value: 3 },
        { label: '4 - Haiku', value: 4 },
        { label: '5 - Mythos 详解', value: 5 },
        { label: '6 - 总结', value: 6 },
        { label: '7 - Mythos 预告', value: 7 },
      ],
    },

    // Scene 1
    s1Question: { label: '开场提问', group: 'content', control: 'text', order: 1, description: 'Scene 1' },
    s1Subtitle: { label: '开场副标题', group: 'content', control: 'text', order: 2, description: 'Scene 1' },

    // Scene 2
    s2ModelName: { label: 'Opus 标题', group: 'content', control: 'text', order: 3, description: 'Scene 2' },
    s2Origin: { label: 'Opus 词源', group: 'content', control: 'text', order: 4, description: 'Scene 2' },
    s2Detail1: { label: 'Opus 作品1', group: 'content', control: 'text', order: 5, description: 'Scene 2' },
    s2Detail2: { label: 'Opus 作品2', group: 'content', control: 'text', order: 6, description: 'Scene 2' },
    s2Tagline: { label: 'Opus 标签语', group: 'content', control: 'text', order: 7, description: 'Scene 2' },

    // Scene 3
    s3ModelName: { label: 'Sonnet 标题', group: 'content', control: 'text', order: 8, description: 'Scene 3' },
    s3Origin: { label: 'Sonnet 描述', group: 'content', control: 'text', order: 9, description: 'Scene 3' },
    s3Detail1: { label: 'Sonnet 引用1', group: 'content', control: 'text', order: 10, description: 'Scene 3' },
    s3Detail2: { label: 'Sonnet 引用2', group: 'content', control: 'text', order: 11, description: 'Scene 3' },
    s3Tagline: { label: 'Sonnet 标签语', group: 'content', control: 'text', order: 12, description: 'Scene 3' },

    // Scene 4
    s4ModelName: { label: 'Haiku 标题', group: 'content', control: 'text', order: 13, description: 'Scene 4' },
    s4Origin: { label: 'Haiku 结构', group: 'content', control: 'text', order: 14, description: 'Scene 4' },
    s4Detail1: { label: 'Haiku 诗人', group: 'content', control: 'text', order: 15, description: 'Scene 4' },
    s4Detail2: { label: 'Haiku 名句', group: 'content', control: 'text', order: 16, description: 'Scene 4' },
    s4Tagline: { label: 'Haiku 标签语', group: 'content', control: 'text', order: 17, description: 'Scene 4' },

    // Scene 5 - Mythos Detail
    s5mModelName: { label: 'Mythos 标题', group: 'content', control: 'text', order: 18, description: 'Scene 5' },
    s5mOrigin: { label: 'Mythos 词源', group: 'content', control: 'text', order: 19, description: 'Scene 5' },
    s5mDetail1: { label: 'Mythos 核心释义', group: 'content', control: 'text', order: 20, description: 'Scene 5' },
    s5mDetail2: { label: 'Mythos 延伸解读', group: 'content', control: 'text', order: 21, description: 'Scene 5' },
    s5mTagline: { label: 'Mythos 标签语', group: 'content', control: 'text', order: 22, description: 'Scene 5' },

    // Scene 6 - Summary
    s6Title: { label: '总结标题', group: 'content', control: 'text', order: 23, description: 'Scene 6' },
    s6OpusLine: { label: 'Opus 一句话', group: 'content', control: 'text', order: 24, description: 'Scene 6' },
    s6SonnetLine: { label: 'Sonnet 一句话', group: 'content', control: 'text', order: 25, description: 'Scene 6' },
    s6HaikuLine: { label: 'Haiku 一句话', group: 'content', control: 'text', order: 26, description: 'Scene 6' },

    // Scene 7 - Mythos Teaser
    s7ModelName: { label: 'Mythos 预告标题', group: 'content', control: 'text', order: 27, description: 'Scene 7' },
    s7Origin: { label: 'Mythos 预告词源', group: 'content', control: 'text', order: 28, description: 'Scene 7' },
    s7Tagline: { label: 'Mythos 预告标签', group: 'content', control: 'text', order: 29, description: 'Scene 7' },

    // Style
    bgColor: { label: '背景颜色', group: 'style', control: 'color', order: 1 },
    opusColor: { label: 'Opus 颜色', group: 'style', control: 'color', order: 2 },
    sonnetColor: { label: 'Sonnet 颜色', group: 'style', control: 'color', order: 3 },
    haikuColor: { label: 'Haiku 颜色', group: 'style', control: 'color', order: 4 },
    mythosColor: { label: 'Mythos 颜色', group: 'style', control: 'color', order: 5 },
    textColor: { label: '主文字颜色', group: 'style', control: 'color', order: 6 },
    subtextColor: { label: '辅助文字颜色', group: 'style', control: 'color', order: 7 },
  },

  component: ModelNames,

  composition: {
    width: 1280,
    height: 720,
    fps: 30,
    durationInFrames: 180,
  },
};

registerTemplate(modelNames);

export { ModelNames, ModelNamesPropsSchema };
export default modelNames;
