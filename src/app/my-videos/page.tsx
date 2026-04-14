import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/Navbar';
import { getAllTemplateMetadata } from '@/templates/metadata';

const STATUS_LABEL: Record<string, string> = {
  queued: '排队中',
  rendering: '渲染中',
  completed: '已完成',
  failed: '失败',
};

const STATUS_COLOR: Record<string, string> = {
  queued: 'text-slate-400',
  rendering: 'text-yellow-400',
  completed: 'text-green-400',
  failed: 'text-red-400',
};

export default async function MyVideosPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const renders = await prisma.renderJob.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const templates = getAllTemplateMetadata();
  const templateMap = Object.fromEntries(templates.map((t) => [t.id, t.name]));

  return (
    <div className="min-h-screen">
      <Navbar activePage="my-videos" />
      <main className="max-w-4xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-2">我的视频</h2>
        <p className="text-slate-400 mb-8">你导出的视频记录</p>

        {renders.length === 0 ? (
          <div className="text-center py-24 text-slate-600">
            <p className="text-lg mb-4">还没有渲染记录</p>
            <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm">
              去选择模板 →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {renders.map((job) => (
              <div
                key={job.id}
                className="bg-slate-800 rounded-xl px-6 py-4 border border-slate-700 flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium text-sm">
                    {templateMap[job.templateId] ?? job.templateId}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {new Date(job.createdAt).toLocaleString('zh-CN')}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium ${STATUS_COLOR[job.status] ?? 'text-slate-400'}`}>
                    {STATUS_LABEL[job.status] ?? job.status}
                    {job.status === 'rendering' && ` ${job.progress}%`}
                  </span>
                  {job.status === 'completed' && job.outputPath && (
                    <a
                      href={job.outputPath}
                      download
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      下载
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
