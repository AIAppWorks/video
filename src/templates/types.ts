import React from 'react';
import { z } from 'zod';

/**
 * 编辑器 UI 元数据 — 描述每个 prop 在编辑器中的展示方式
 */
export interface PropFieldMeta {
  /** 显示标签 */
  label: string;
  /** 分组 */
  group: 'content' | 'style' | 'animation';
  /** 控件类型（可从 Zod 类型自动推导，也可手动指定） */
  control?: 'text' | 'textarea' | 'color' | 'number' | 'slider' | 'select';
  /** select 控件的选项 */
  options?: { label: string; value: string | number }[];
  /** number/slider 控件的范围 */
  min?: number;
  max?: number;
  step?: number;
  /** 提示文字 */
  description?: string;
  /** 组内排序（数字越小越靠前） */
  order?: number;
}

/**
 * 视频模板标准接口 — 每个模板必须实现此接口
 *
 * 模板画廊、编辑器、渲染器都通过此接口统一处理模板。
 */
export interface VideoTemplate<S extends z.ZodObject<any> = z.ZodObject<any>> {
  /** 唯一标识，如 'growth-video-lite' */
  id: string;
  /** 显示名称 */
  name: string;
  /** 简短描述 */
  description: string;
  /** 分类标签，用于画廊筛选 */
  tags: string[];
  /** 缩略图路径（相对于 public/） */
  thumbnail: string;

  /** Zod Schema — 验证 + 类型推导 */
  schema: S;
  /** 默认属性值 */
  defaultProps: z.infer<S>;
  /** 每个 prop 的编辑器 UI 元数据 */
  fieldMeta: Record<string, PropFieldMeta>;

  /** 视频渲染 React 组件 */
  component: React.FC<z.infer<S>>;

  /** 视频规格 */
  composition: {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
  };
}
