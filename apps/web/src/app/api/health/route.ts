import { NextResponse } from 'next/server';

export async function GET() {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

  let cmsStatus = 'unknown';
  try {
    const res = await fetch(`${cmsUrl}/health`, { 
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(5000),
    });
    cmsStatus = res.ok ? 'healthy' : 'unhealthy';
  } catch {
    cmsStatus = 'unreachable';
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      web: 'healthy',
      cms: cmsStatus,
    },
    environment: {
      nodeVersion: process.version,
      cmsUrl,
    },
  });
}
