'use client';

import React, { useState } from 'react';
import type { VideoTemplate, PropFieldMeta } from '@/templates/types';
import { TextControl } from './controls/TextControl';
import { NumberControl } from './controls/NumberControl';
import { ColorControl } from './controls/ColorControl';
import { SliderControl } from './controls/SliderControl';
import { SelectControl } from './controls/SelectControl';

interface PropsEditorPanelProps {
  template: VideoTemplate;
  values: Record<string, unknown>;
  onChange: (newValues: Record<string, unknown>) => void;
}

const GROUP_LABELS: Record<string, string> = {
  content: '内容',
  style: '样式',
  animation: '动画',
};

function renderControl(
  key: string,
  meta: PropFieldMeta,
  value: unknown,
  onChange: (v: unknown) => void
) {
  const control = meta.control ?? (typeof value === 'number' ? 'number' : 'text');

  switch (control) {
    case 'select':
      return (
        <SelectControl
          key={key}
          label={meta.label}
          value={value as string | number}
          onChange={onChange as (v: string | number) => void}
          options={meta.options ?? []}
          description={meta.description}
        />
      );
    case 'color':
      return (
        <ColorControl
          key={key}
          label={meta.label}
          value={value as string}
          onChange={onChange}
          description={meta.description}
        />
      );
    case 'slider':
      return (
        <SliderControl
          key={key}
          label={meta.label}
          value={value as number}
          onChange={onChange as (v: number) => void}
          description={meta.description}
          min={meta.min}
          max={meta.max}
          step={meta.step}
        />
      );
    case 'number':
      return (
        <NumberControl
          key={key}
          label={meta.label}
          value={value as number}
          onChange={onChange as (v: number) => void}
          description={meta.description}
          min={meta.min}
          max={meta.max}
          step={meta.step}
        />
      );
    case 'textarea':
      return (
        <TextControl
          key={key}
          label={meta.label}
          value={value as string}
          onChange={onChange as (v: string) => void}
          description={meta.description}
          multiline
        />
      );
    default:
      return (
        <TextControl
          key={key}
          label={meta.label}
          value={value as string}
          onChange={onChange as (v: string) => void}
          description={meta.description}
        />
      );
  }
}

export function PropsEditorPanel({ template, values, onChange }: PropsEditorPanelProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    content: true,
    style: true,
    animation: true,
  });

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  // 按 group 聚合，组内按 order 排序
  const grouped: Record<string, Array<[string, PropFieldMeta]>> = {};
  for (const [key, meta] of Object.entries(template.fieldMeta)) {
    const g = meta.group;
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push([key, meta]);
  }
  for (const g of Object.keys(grouped)) {
    grouped[g].sort((a, b) => (a[1].order ?? 99) - (b[1].order ?? 99));
  }

  const handleFieldChange = (key: string, newValue: unknown) => {
    onChange({ ...values, [key]: newValue });
  };

  return (
    <div className="flex flex-col gap-2">
      {['content', 'style', 'animation'].map((group) => {
        const fields = grouped[group];
        if (!fields?.length) return null;
        const isOpen = openGroups[group];

        return (
          <div key={group} className="bg-slate-800/60 rounded-md overflow-hidden border border-slate-700/60">
            {/* 分组标题 */}
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700/40 transition-colors"
            >
              <span>{GROUP_LABELS[group] ?? group}</span>
              <span className="text-slate-500 text-[10px]">{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* 字段列表 */}
            {isOpen && (
              <div className="px-3 pb-3 flex flex-col gap-3 border-t border-slate-700/60">
                <div className="pt-2 flex flex-col gap-3">
                  {fields.map(([key, meta]) =>
                    renderControl(key, meta, values[key], (v) => handleFieldChange(key, v))
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
