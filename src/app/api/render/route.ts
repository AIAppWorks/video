import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getTemplateMetadata } from '@/templates/metadata';
import { createJob, getJob, startRender } from '@/server/render-queue';

// POST /api/render — 发起渲染
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }

  let body: { templateId?: string; props?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { templateId, props } = body;
  if (!templateId || !props) {
    return NextResponse.json({ error: 'templateId and props are required' }, { status: 400 });
  }

  const meta = getTemplateMetadata(templateId);
  if (!meta) {
    return NextResponse.json({ error: `Template "${templateId}" not found` }, { status: 404 });
  }

  const job = await createJob(templateId, props, session.user.id);

  setImmediate(() => {
    startRender(job.id, templateId, props);
  });

  return NextResponse.json({ jobId: job.id }, { status: 202 });
}

// GET /api/render?jobId=xxx — 查询进度
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }

  const jobId = req.nextUrl.searchParams.get('jobId');
  if (!jobId) {
    return NextResponse.json({ error: 'jobId is required' }, { status: 400 });
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    progress: job.progress,
    downloadUrl: job.outputPath ?? null,
    error: job.error ?? null,
  });
}
