import { useAuth } from "../context/AuthContext";

export function DashboardPage() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      // Optionally, you can redirect after logout or show a toast here
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      authenticated users only
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
