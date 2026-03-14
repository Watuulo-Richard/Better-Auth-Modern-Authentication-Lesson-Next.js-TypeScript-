import db from '@/prisma/instance';
import crypto from 'crypto';

/* ─── IP Utilities ─────────────────────────────────────────── */

export function hashIP(ip: string): string {
  return crypto
    .createHash('sha256')
    .update(ip + process.env.IP_SALT)
    .digest('hex');
}

export function getIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP;
  return 'unknown';
}

/* ─── Device Parser ─────────────────────────────────────────── */

export function parseUserAgent(ua: string): {
  device: string;
  os: string;
  browser: string;
} {
  // Device
  let device = 'Desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = 'Tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) {
    device = 'Mobile';
  }

  // OS
  let os = 'Unknown OS';
  if (/windows nt/i.test(ua)) os = 'Windows';
  else if (/mac os x/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/chromeos/i.test(ua)) os = 'ChromeOS';

  // Browser
  let browser = 'Unknown Browser';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/opr\//i.test(ua)) browser = 'Opera';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/msie|trident/i.test(ua)) browser = 'Internet Explorer';

  return { device, os, browser };
}

/* ─── Visit Logic ───────────────────────────────────────────── */

function isRecentVisit(lastVisit: Date): boolean {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
  return lastVisit > twentyFourHoursAgo;
}

export async function incrementPageViews(
  hashedIP: string,
  rawIP: string,
  userAgent: string
): Promise<number> {
  try {
    const { device, os, browser } = parseUserAgent(userAgent);

    const existingView = await db.pageView.findUnique({
      where: { ipHash: hashedIP },
    });

    // Always log every visit to VisitorLog
    await db.visitorLog.create({
      data: {
        ipAddress: rawIP,
        device,
        os,
        browser,
        userAgent,
      },
    });

    // Deduplicate: skip count increment if visited within 24 hours
    if (existingView && isRecentVisit(existingView.lastVisit)) {
      console.log('Recent visitor, not counting');
      return await getTotalViews();
    }

    if (existingView) {
      await db.pageView.update({
        where: { ipHash: hashedIP },
        data: {
          lastVisit: new Date(),
          count: { increment: 1 },
        },
      });
    } else {
      await db.pageView.create({
        data: { ipHash: hashedIP },
      });
    }

    await db.siteStats.upsert({
      where: { id: 'site-stats' },
      create: { id: 'site-stats', totalViews: 1 },
      update: { totalViews: { increment: 1 } },
    });

    return await getTotalViews();
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
}

export async function getTotalViews(): Promise<number> {
  const stats = await db.siteStats.findUnique({
    where: { id: 'site-stats' },
  });
  return stats?.totalViews || 0;
}

// Fetch all visitor logs for your dashboard
export async function getVisitorLogs() {
  return await db.visitorLog.findMany({
    orderBy: { visitedAt: 'desc' },
    take: 100, // latest 100 visits
  });
}