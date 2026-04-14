import type { VideoTemplate } from './types';

const templateMap = new Map<string, VideoTemplate>();

export function registerTemplate(template: VideoTemplate): void {
  if (templateMap.has(template.id)) {
    throw new Error(`Template "${template.id}" is already registered`);
  }
  templateMap.set(template.id, template);
}

export function getTemplate(id: string): VideoTemplate | undefined {
  return templateMap.get(id);
}

export function getAllTemplates(): VideoTemplate[] {
  return Array.from(templateMap.values());
}
