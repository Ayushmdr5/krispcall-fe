import { AnalyticsDashboard } from "../components/Analytics";
import WeatherWidget from "../components/WeatherWidget";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">{user?.email || "User"}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Your project and weather overview
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/stripe")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Checkout
          </button>
          <button
            onClick={() => navigate("/projects/list")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Project List
          </button>
          <button
            onClick={() => navigate("/projects/new")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Create New Project
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-white col-span-2 rounded-2xl shadow p-6">
          <AnalyticsDashboard />
        </div>
        <WeatherWidget />
      </main>
    </div>
  );
}
