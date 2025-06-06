import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchAnalytics,
  AnalyticsResponse,
  StatusDistribution,
  CreationTrend,
} from "../services/analytics";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  completed: "#16a34a",
  in_progress: "#ca8a04",
  to_do: "#6b7280",
};

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading analytics...</p>;
  if (!analytics)
    return <p className="text-center mt-10">No analytics data available.</p>;

  const { statusDistribution, creationTrends } = analytics;

  const numericStatusDistribution = statusDistribution.map(
    ({ status, count }) => ({
      status,
      count: Number(count),
    })
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Project Status Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={numericStatusDistribution}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) =>
                `${entry.status.replace("_", " ").toUpperCase()} (${
                  entry.count
                })`
              }
            >
              {statusDistribution.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status] || "#8884d8"}
                />
              ))}
            </Pie>
            <ReTooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Project Creation Trends (Last 30 days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={creationTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(date) => date.slice(5)} />
            <YAxis allowDecimals={false} />
            <ReTooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={2}
              name="Projects Created"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
