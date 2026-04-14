import { notFound } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { getTemplateMetadata } from '@/templates/metadata';
import { EditorClient } from '@/editor/EditorClient';

interface EditorPageProps {
  params: Promise<{ templateId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { templateId } = await params;
  const meta = getTemplateMetadata(templateId);
  if (!meta) notFound();

  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
            ← 返回模板
          </Link>
          <span className="text-slate-700">|</span>
          <h1 className="text-white font-semibold text-sm">{meta.name}</h1>
          <div className="flex gap-2">
            {meta.tags.map((tag) => (
              <span key={tag} className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {!isLoggedIn && (
          <Link href="/login" className="text-xs text-slate-400 hover:text-white transition-colors">
            登录后可导出视频 →
          </Link>
        )}
      </header>
      <EditorClient templateId={templateId} isLoggedIn={isLoggedIn} />
    </div>
  );
}
