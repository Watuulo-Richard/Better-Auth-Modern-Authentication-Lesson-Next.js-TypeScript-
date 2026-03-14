import { NextRequest, NextResponse } from 'next/server';
import {
  incrementPageViews,
  getTotalViews,
  getVisitorLogs,
  getIP,
  hashIP,
} from '@/lib/view-counter';

export async function POST(request: NextRequest) {
  try {
    const ip = getIP(request);
    const hashedIP = hashIP(ip);
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const views = await incrementPageViews(hashedIP, ip, userAgent);
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeLogs = searchParams.get('logs') === 'true';

    const views = await getTotalViews();

    if (includeLogs) {
      const logs = await getVisitorLogs();
      return NextResponse.json({ views, logs });
    }

    return NextResponse.json({ views });
  } catch (error) {
    console.error('Error getting views:', error);
    return NextResponse.json(
      { error: 'Failed to get views' },
      { status: 500 }
    );
  }
}