"use server";

import { baseAPI } from "@/config/axios";
import type {
  ViewsApiResponse,
  VisitorLog,
} from "@/types/analytics-types";
import type {
  MonthlyAnalytics,
  MonthlyDeviceRow,
  DeviceType,
} from "@/types/bar-chart-analytics-type";

type ViewCounterResponse = {
  success: boolean;
  data: number | null;
  message: string;
  error: string | null;
};

type VisitorLogsResponse = {
  success: boolean;
  data: { views: number; logs: VisitorLog[] } | null;
  message: string;
  error: string | null;
};

export async function incrementPageViewsAction(): Promise<ViewCounterResponse> {
  try {
    const response = await baseAPI.post("/visitor");
    return { success: true, data: response.data.views, message: "View counted successfully", error: null };
  } catch (error) {
    console.error("Error incrementing views:", error);
    return { success: false, data: null, message: "Failed to track view", error: "❌ Error! Could not track page view. Please try again." };
  }
}

export async function getTotalViewsAction(): Promise<ViewCounterResponse> {
  try {
    const response = await baseAPI.get("/visitor");
    return { success: true, data: response.data.views, message: "Views fetched successfully", error: null };
  } catch (error) {
    console.error("Error getting views:", error);
    return { success: false, data: null, message: "Failed to fetch views", error: "❌ Error! Could not fetch page views." };
  }
}

export async function getVisitorLogsAction(): Promise<VisitorLogsResponse> {
  try {
    const response = await baseAPI.get("/visitor?logs=true");
    return { success: true, data: response.data, message: "Visitor logs fetched successfully", error: null };
  } catch (error) {
    console.error("Error fetching visitor logs:", error);
    return { success: false, data: null, message: "Failed to fetch visitor logs", error: "❌ Error! Could not fetch visitor logs." };
  }
}

export async function getMonthlyAnalytics(): Promise<MonthlyAnalytics> {
  const response = await baseAPI.get<ViewsApiResponse>("/visitor?logs=true");
  const data = response.data as { views: number; logs: VisitorLog[] };
  const logs: VisitorLog[] = data.logs ?? [];

  const map = new Map<string, { desktop: number; mobile: number; tablet: number }>();

  for (const log of logs) {
    const d = new Date(log.visitedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map.has(key)) map.set(key, { desktop: 0, mobile: 0, tablet: 0 });
    const entry = map.get(key)!;
    const device = log.device as DeviceType;
    if (device === "desktop") entry.desktop++;
    else if (device === "mobile") entry.mobile++;
    else if (device === "tablet") entry.tablet++;
  }

  const sorted = [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6);

  const rows: MonthlyDeviceRow[] = sorted.map(([key, counts]) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return {
      month: date.toLocaleString("en-US", { month: "short" }),
      fullMonth: date.toLocaleString("en-US", { month: "long", year: "numeric" }),
      ...counts,
    };
  });

  const last = rows[rows.length - 1];
  const prev = rows[rows.length - 2];
  let trend: "up" | "down" | "flat" = "flat";
  let trendPercent = 0;

  if (last && prev) {
    const lastTotal = last.desktop + last.mobile + last.tablet;
    const prevTotal = prev.desktop + prev.mobile + prev.tablet;
    if (prevTotal > 0) {
      trendPercent = Math.round(((lastTotal - prevTotal) / prevTotal) * 100);
      trend = trendPercent > 0 ? "up" : trendPercent < 0 ? "down" : "flat";
      trendPercent = Math.abs(trendPercent);
    }
  }

  return { rows, trend, trendPercent };
}
