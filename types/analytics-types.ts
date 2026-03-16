// ─── Visitor Log Entry ────────────────────────────────────────────────────────

export interface VisitorLog {
  id:        string;
  ipAddress: string;
  device:    string;
  os:        string;
  browser:   string;
  userAgent: string;
  visitedAt: string | Date;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

// ─── API Response Types ────────────────────────────────────────────────────────

/** POST /api/views — track a new page view */
export interface TrackViewResponse {
  views: number;
}

/** GET /api/views — get total views (no logs) */
export interface GetViewsResponse {
  views: number;
}

/** GET /api/views?logs=true — get total views + visitor logs */
export interface GetViewsWithLogsResponse {
  views: number;
  logs: VisitorLog[];
}

/** Union: either shape depending on whether ?logs=true was passed */
export type ViewsApiResponse = GetViewsResponse | GetViewsWithLogsResponse;

// ─── Derived / UI Types ───────────────────────────────────────────────────────

export interface DeviceBreakdown {
  device: DeviceType;
  count: number;
  percentage: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  deviceBreakdown: DeviceBreakdown[];
}

// ─── Type Guards ──────────────────────────────────────────────────────────────

export function hasLogs(
  res: ViewsApiResponse
): res is GetViewsWithLogsResponse {
  return 'logs' in res && Array.isArray((res as GetViewsWithLogsResponse).logs);
}