import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { prisma } from '@/lib/prisma';

export type RenderStatus = 'queued' | 'rendering' | 'completed' | 'failed';

export interface RenderJob {
  id: string;
  templateId: string;
  status: RenderStatus;
  progress: number;
  outputPath?: string;
  error?: string;
  createdAt: number;
}

// 内存缓存（供进度轮询快速读取）
const jobCache = new Map<string, RenderJob>();

const ROOT = path.resolve(process.cwd());
const HYBRID_BIN = path.join(ROOT, 'remotion-hybrid-bin');
const ENTRY = path.join(ROOT, 'src/index.ts');
const OUT_DIR = path.join(ROOT, 'public/renders');

export async function createJob(
  templateId: string,
  props: Record<string, unknown>,
  userId: string
): Promise<RenderJob> {
  const dbJob = await prisma.renderJob.create({
    data: {
      templateId,
      props: JSON.stringify(props),
      userId,
      status: 'queued',
      progress: 0,
    },
  });

  const job: RenderJob = {
    id: dbJob.id,
    templateId,
    status: 'queued',
    progress: 0,
    createdAt: dbJob.createdAt.getTime(),
  };
  jobCache.set(job.id, job);
  return job;
}

export function getJob(id: string): RenderJob | undefined {
  return jobCache.get(id);
}

export function startRender(
  jobId: string,
  templateId: string,
  inputProps: Record<string, unknown>
): void {
  const job = jobCache.get(jobId);
  if (!job) return;

  job.status = 'rendering';
  job.progress = 0;
  prisma.renderJob.update({ where: { id: jobId }, data: { status: 'rendering' } }).catch(() => {});

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const outputFile = path.join(OUT_DIR, `${jobId}.mp4`);
  const propsJson = JSON.stringify(inputProps);

  const args = [
    'remotion', 'render',
    ENTRY,
    templateId,
    outputFile,
    `--binaries-directory=${HYBRID_BIN}`,
    '--muted',
    '--overwrite',
    '--codec=h264',
    '--crf=23',
    '--image-format=jpeg',
    '--jpeg-quality=80',
    `--props=${propsJson}`,
  ];

  console.log(`[Render ${jobId}] Starting render for template: ${templateId}`);
  console.log(`[Render ${jobId}] Output file: ${outputFile}`);
  console.log(`[Render ${jobId}] Command: npx ${args.join(' ')}`);

  const child = spawn('npx', args, {
    cwd: ROOT,
    env: {
      ...process.env,
      PATH: `${HYBRID_BIN}:${process.env.PATH}`,
      REMOTION_CHROMIUM_CACHE_DIR: HYBRID_BIN,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let allOutput = '';
  child.stdout.on('data', (data: Buffer) => {
    const text = data.toString();
    allOutput += text;
    console.log(`[Render ${jobId}] stdout:`, text.trim());

    // 尝试多种进度格式
    const match = text.match(/Rendered\s+(\d+)\/(\d+)/);
    if (match) {
      job.progress = Math.round((parseInt(match[1]) / parseInt(match[2])) * 90);
      console.log(`[Render ${jobId}] Progress updated: ${job.progress}%`);
    }
    const encMatch = text.match(/Encoded\s+(\d+)\/(\d+)/);
    if (encMatch) {
      job.progress = 90 + Math.round((parseInt(encMatch[1]) / parseInt(encMatch[2])) * 10);
      console.log(`[Render ${jobId}] Encoding progress: ${job.progress}%`);
    }
  });

  let stderr = '';
  child.stderr.on('data', (data: Buffer) => {
    const errText = data.toString();
    stderr += errText;
    console.error(`[Render ${jobId}] stderr:`, errText.trim());
  });

  child.on('close', (code) => {
    console.log(`[Render ${jobId}] Process closed with code: ${code}`);
    console.log(`[Render ${jobId}] Total stdout output length: ${allOutput.length} chars`);

    if (code === 0) {
      job.status = 'completed';
      job.progress = 100;
      job.outputPath = `/renders/${jobId}.mp4`;
      console.log(`[Render ${jobId}] Render completed successfully`);
      prisma.renderJob.update({
        where: { id: jobId },
        data: { status: 'completed', progress: 100, outputPath: job.outputPath, completedAt: new Date() },
      }).catch(() => {});
    } else {
      job.status = 'failed';
      job.error = stderr.slice(-500) || `Exit code ${code}`;
      console.error(`[Render ${jobId}] Render failed: ${job.error}`);
      prisma.renderJob.update({
        where: { id: jobId },
        data: { status: 'failed', error: job.error },
      }).catch(() => {});
    }
  });

  child.on('error', (err) => {
    job.status = 'failed';
    job.error = err.message;
    console.error(`[Render ${jobId}] Process error: ${err.message}`);
    prisma.renderJob.update({
      where: { id: jobId },
      data: { status: 'failed', error: err.message },
    }).catch(() => {});
  });
}
