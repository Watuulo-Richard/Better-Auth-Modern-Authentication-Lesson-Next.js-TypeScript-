'use server';

import { baseUrl } from '@/types/types';
import {
  VisitorLog,
  DeviceType,
  DeviceBreakdown,
  AnalyticsSummary,
  ViewsApiResponse,
  hasLogs,
} from '@/types/analytics-types';
import { MonthlyAnalytics, MonthlyDeviceRow } from '@/types/bar-chart-analytics-type';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normaliseDevice(raw: string): DeviceType {
  const d = raw.toLowerCase().trim();
  if (d === 'mobile')  return 'mobile';
  if (d === 'tablet')  return 'tablet';
  if (d === 'desktop') return 'desktop';
  if (/tablet|ipad|playbook|silk|(android(?!.*mobile))/.test(d)) return 'tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/.test(d)) return 'mobile';
  return 'unknown';
}

/**
 * Robustly parse any date value that may come from an ORM or JSON response.
 * Handles: ISO strings, numeric timestamps (ms or s), Date objects.
 */
function parseDate(raw: unknown): Date | null {
  if (!raw) return null;

  // Already a Date (shouldn't happen over JSON, but defensive)
  if (raw instanceof Date) return isNaN(raw.getTime()) ? null : raw;

  // Numeric timestamp
  if (typeof raw === 'number') {
    // Heuristic: Unix seconds if < 1e10, milliseconds otherwise
    const ms  = raw < 1_000_000_000_000 ? raw * 1000 : raw;
    const d   = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }

  if (typeof raw === 'string') {
    // Try native parse first (covers ISO 8601)
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d;

    // Some ORMs return e.g. "2025-03-15 14:32:00" without the T separator
    const fixed = new Date(raw.replace(' ', 'T'));
    if (!isNaN(fixed.getTime())) return fixed;
  }

  return null;
}

async function fetchLogs(): Promise<{ views: number; logs: VisitorLog[] }> {
  const res = await fetch(`${baseUrl}/api/v1/visitor?logs=true`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch analytics: ${res.statusText}`);

  const data: ViewsApiResponse = await res.json();

  const logs = hasLogs(data) ? data.logs : [];

  // Debug: log the first raw visitedAt so you can see the exact format
  if (logs.length > 0) {
    console.log('[analytics] first log visitedAt raw value:', logs[0].visitedAt, typeof logs[0].visitedAt);
  }

  return { views: data.views, logs };
}

// ─── Pie chart action ─────────────────────────────────────────────────────────

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const { views, logs } = await fetchLogs();

  if (logs.length === 0) {
    return { totalViews: views, uniqueVisitors: 0, deviceBreakdown: [] };
  }

  const deviceCounts: Record<DeviceType, number> = {
    mobile: 0, tablet: 0, desktop: 0, unknown: 0,
  };
  const seenIPs = new Set<string>();

  for (const log of logs) {
    seenIPs.add(log.ipAddress);
    deviceCounts[normaliseDevice(log.device)]++;
  }

  const total = logs.length;

  const deviceBreakdown: DeviceBreakdown[] = (
    Object.entries(deviceCounts) as [DeviceType, number][]
  )
    .filter(([, count]) => count > 0)
    .map(([device, count]) => ({
      device,
      count,
      percentage: Math.round((count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count);

  return { totalViews: views, uniqueVisitors: seenIPs.size, deviceBreakdown };
}

// ─── Bar chart action ─────────────────────────────────────────────────────────

export async function getMonthlyAnalytics(): Promise<MonthlyAnalytics> {
  const { logs } = await fetchLogs();

  const MONTH_LABELS = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
  const SHORT_LABELS = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec',
  ];

  // Group by "YYYY-MM"
  const map = new Map<string, { desktop: number; mobile: number; tablet: number }>();

  for (const log of logs) {
    const date = parseDate(log.visitedAt);
    if (!date) {
      console.warn('[analytics] skipping log with unparseable visitedAt:', log.visitedAt);
      continue;
    }

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!map.has(key)) map.set(key, { desktop: 0, mobile: 0, tablet: 0 });

    const entry  = map.get(key)!;
    const device = normaliseDevice(log.device);

    if (device === 'desktop')     entry.desktop++;
    else if (device === 'mobile') entry.mobile++;
    else if (device === 'tablet') entry.tablet++;
  }

  // Build exactly 6 months (oldest → newest) using a safe subtraction approach
  // that correctly rolls back across year boundaries
  const now  = new Date();
  const rows: MonthlyDeviceRow[] = [];

  for (let i = 5; i >= 0; i--) {
    // Set to the 1st of (currentMonth - i), handling year rollover automatically
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const key  = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const data = map.get(key) ?? { desktop: 0, mobile: 0, tablet: 0 };

    rows.push({
      month:     SHORT_LABELS[d.getMonth()],
      fullMonth: `${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`,
      ...data,
    });
  }

  console.log('[analytics] monthly rows:', rows.map(r => `${r.fullMonth}: d=${r.desktop} m=${r.mobile} t=${r.tablet}`));

  const last  = rows[5].desktop + rows[5].mobile + rows[5].tablet;
  const prev  = rows[4].desktop + rows[4].mobile + rows[4].tablet;
  const diff  = prev === 0 ? 0 : ((last - prev) / prev) * 100;
  const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat';

  return {
    rows,
    trendPercent: Math.abs(Math.round(diff * 10) / 10),
    trend,
  };
}