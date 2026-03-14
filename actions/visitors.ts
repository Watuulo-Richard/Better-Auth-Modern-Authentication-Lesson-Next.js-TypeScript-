"use server";

import { baseAPI } from "@/config/axios";

type VisitorLog = {
  id: string;
  ipAddress: string;
  device: string;
  os: string;
  browser: string;
  userAgent: string;
  visitedAt: string;
};

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
    return {
      success: true,
      data: response.data.views,
      message: "View counted successfully",
      error: null,
    };
  } catch (error) {
    console.error("Error incrementing views:", error);
    return {
      success: false,
      data: null,
      message: "Failed to track view",
      error: "❌ Error! Could not track page view. Please try again.",
    };
  }
}

export async function getTotalViewsAction(): Promise<ViewCounterResponse> {
  try {
    const response = await baseAPI.get("/visitor");
    return {
      success: true,
      data: response.data.views,
      message: "Views fetched successfully",
      error: null,
    };
  } catch (error) {
    console.error("Error getting views:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch views",
      error: "❌ Error! Could not fetch page views.",
    };
  }
}

// New: fetch views + full visitor logs for your dashboard
export async function getVisitorLogsAction(): Promise<VisitorLogsResponse> {
  try {
    const response = await baseAPI.get("/visitor?logs=true");
    return {
      success: true,
      data: response.data,
      message: "Visitor logs fetched successfully",
      error: null,
    };
  } catch (error) {
    console.error("Error fetching visitor logs:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch visitor logs",
      error: "❌ Error! Could not fetch visitor logs.",
    };
  }
}