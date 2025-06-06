import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProjects, deleteProject, type Project } from "../services/project";
import { AnalyticsDashboard } from "../components/Analytics";

export function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteProject(id);
      toast.success("Project deleted");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in_progress":
        return "text-yellow-600";
      case "to_do":
      default:
        return "text-gray-600";
    }
  };

  if (loading) return <p className="text-center mt-10">Loading projects...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found. Create one!</p>
      ) : (
        <ul className="space-y-4">
          {projects.map(({ id, title, description, status }) => (
            <li
              key={id}
              className="relative p-4 border rounded shadow-sm hover:shadow-md transition"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-sm text-white px-2 py-1 rounded-md"
                disabled={deletingId === id}
              >
                {deletingId === id ? "Deleting..." : "Delete"}
              </button>

              <h2 className="text-xl font-semibold">{title}</h2>
              {description && (
                <p className="text-gray-700 my-2">{description}</p>
              )}
              <p>
                Status:{" "}
                <span className={`font-bold ${getStatusColor(status)}`}>
                  {status?.replace("_", " ").toUpperCase()}
                </span>
              </p>
              <button
                onClick={() => navigate(`/projects/${id}/edit`)}
                className="mt-4 inline-block text-sm bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
