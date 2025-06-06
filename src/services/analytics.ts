import api from "../axios"; // your axios instance with interceptor

export interface StatusDistribution {
  status: string;
  count: number;
}

export interface CreationTrend {
  date: string; // e.g. "2025-05-01"
  count: number;
}

export interface AnalyticsResponse {
  statusDistribution: StatusDistribution[];
  creationTrends: CreationTrend[];
}

export const fetchAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await api.get<AnalyticsResponse>("/analytics");
  return response.data;
};
