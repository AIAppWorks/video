'use client';

import React from 'react';

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

export function ColorControl({ label, value, onChange, description }: ColorControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-300">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded border border-slate-700 bg-slate-900 cursor-pointer p-0.5 flex-shrink-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
          placeholder="#000000"
        />
      </div>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
}
