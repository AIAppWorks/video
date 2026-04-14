'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
    >
      退出
    </button>
  );
}
