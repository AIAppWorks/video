'use client';

import React from 'react';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectControlProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  description?: string;
}

export function SelectControl({ label, value, onChange, options, description }: SelectControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-300">{label}</label>
      <select
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          // If the original value is a number, parse back to number
          const firstOpt = options[0];
          if (firstOpt && typeof firstOpt.value === 'number') {
            onChange(Number(raw));
          } else {
            onChange(raw);
          }
        }}
        className="bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
}
