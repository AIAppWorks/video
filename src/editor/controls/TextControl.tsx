'use client';

import React from 'react';

interface TextControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  multiline?: boolean;
}

export function TextControl({ label, value, onChange, description, multiline }: TextControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-300">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      )}
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
}
