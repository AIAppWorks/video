import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SignOutButton } from './SignOutButton';

export async function Navbar({ activePage }: { activePage?: 'gallery' | 'my-videos' }) {
  const session = await auth();

  return (
    <header className="border-b border-slate-800 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-white">Video.AiAppWorks.cn</Link>
      <nav className="flex items-center gap-6 text-sm text-slate-400">
        <Link href="/" className={activePage === 'gallery' ? 'text-white font-medium' : 'hover:text-white transition-colors'}>
          模板
        </Link>
        {session?.user && (
          <Link href="/my-videos" className={activePage === 'my-videos' ? 'text-white font-medium' : 'hover:text-white transition-colors'}>
            我的视频
          </Link>
        )}
        {session?.user ? (
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs">
              {session.user.name ?? session.user.email}
            </span>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="hover:text-white transition-colors">登录</Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
              注册
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
