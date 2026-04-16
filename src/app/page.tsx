import Link from 'next/link';
import Image from 'next/image';
import { getAllTemplateMetadata } from '@/templates/metadata';
import { Navbar } from '@/components/Navbar';

export default function HomePage() {
  const templates = getAllTemplateMetadata();

  return (
    <div className="min-h-screen">
      <Navbar activePage="gallery" />
      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">选择模板</h2>
          <p className="text-slate-400">选择一个模板，自定义文案和样式，导出你的短视频</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/editor/${template.id}`}
              className="group block bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="relative overflow-hidden bg-slate-900">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  width={template.composition.width}
                  height={template.composition.height}
                  className="w-full h-auto object-cover"
                  priority={false}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="bg-slate-800/90 text-slate-300 text-xs px-2 py-0.5 rounded">
                    {template.composition.width}×{template.composition.height}
                  </span>
                  <span className="bg-slate-800/90 text-slate-300 text-xs px-2 py-0.5 rounded">
                    {(template.composition.durationInFrames / template.composition.fps).toFixed(0)}秒
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-indigo-400 transition-colors">
                  {template.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span key={tag} className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="w-full bg-indigo-600 group-hover:bg-indigo-500 text-white text-sm font-medium py-2 rounded-lg text-center transition-colors">
                  使用此模板
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
