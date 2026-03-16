'use server';

import { AnalyticsSummary, DeviceBreakdown, DeviceType, hasLogs, ViewsApiResponse } from "@/types/analytics-types";
import { baseUrl } from "@/types/types";

/* Device Detection */

function detectDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk|(android(?!.*mobile))/.test(ua)) {
    return 'tablet';
  }
  if (
    /mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/.test(
      ua
    )
  ) {
    return 'mobile';
  }
  if (ua === 'unknown' || ua.trim() === '') {
    return 'unknown';
  }
  return 'desktop';
}

/* Actions */

/**
 * Fetches total views + visitor logs, then computes a device breakdown
 * suitable for a pie chart.
 */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const res = await fetch(
    `${baseUrl}/api/v1/visitor?logs=true`,
    { cache: 'no-store' }
  );

  console.log(res, "here is the analytics summary...😊✅");

  if (!res.ok) {
    throw new Error(`Failed to fetch analytics: ${res.statusText}`);
  }

  const data: ViewsApiResponse = await res.json();

  if (!hasLogs(data)) {
    return {
      totalViews: data.views,
      uniqueVisitors: 0,
      deviceBreakdown: [],
    };
  }

  const { views, logs } = data;

  // Count devices
  const deviceCounts: Record<DeviceType, number> = {
    mobile: 0,
    tablet: 0,
    desktop: 0,
    unknown: 0,
  };

  const seenIPs = new Set<string>();

  for (const log of logs) {
    seenIPs.add(log.ipAddress);
    const device = detectDevice(log.device || log.userAgent) as DeviceType;
    deviceCounts[device]++;
  }

  const total = logs.length || 1; // avoid divide-by-zero

  const deviceBreakdown: DeviceBreakdown[] = (
    Object.entries(deviceCounts) as [DeviceType, number][]
  )
    .filter(([, count]) => count > 0)
    .map(([device, count]) => ({
      device,
      count,
      percentage: Math.round((count / total) * 100 * 10) / 10,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalViews: views,
    uniqueVisitors: seenIPs.size,
    deviceBreakdown,
  };
}

/**
 * Tracks a page view from the client (calls the POST endpoint).
 * Safe to call inside a Server Action triggered by a client component.
 */
export async function trackPageView(): Promise<{ views: number }> {
  const res = await fetch(
    `${baseUrl}/api/v1/visitor`,
    {
      method: 'POST',
      cache: 'no-store',
    }
  );

  console.log(res, "here i track every client...😊✅");

  if (!res.ok) {
    throw new Error(`Failed to track page view: ${res.statusText}`);
  }

  return res.json();
}