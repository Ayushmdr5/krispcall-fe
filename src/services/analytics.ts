import api from "../axios";

export interface StatusDistribution {
  status: string;
  count: number;
}

export interface CreationTrend {
  date: string;
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
