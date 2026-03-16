// analytics-types.ts — add these at the bottom, remove bar-chart-analytics-type.ts
export type DeviceType = "desktop" | "mobile" | "tablet";
export interface MonthlyDeviceRow {
  month:     string;
  fullMonth: string;
  desktop:   number;
  mobile:    number;
  tablet:    number;
}

export interface MonthlyAnalytics {
  rows:         MonthlyDeviceRow[];
  trendPercent: number;
  trend:        'up' | 'down' | 'flat';
}