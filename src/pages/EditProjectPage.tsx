import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectById,
  updateProject,
  type ProjectPayload,
} from "../services/project";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectPayload>();

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const project = await getProjectById(Number(id));
        setValue("title", project.title);
        setValue("description", project.description || "");
        setValue("status", project.status);
      } catch (err) {
        toast.error("Project not found");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate, setValue]);

  const onSubmit = async (data: ProjectPayload) => {
    if (!id) return;
    setUpdating(true);
    try {
      await updateProject(Number(id), data);
      toast.success("Project updated!");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to update project");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading project...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 mt-10 bg-gray-50 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Edit Project
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium mb-1 block">
          Title <span className="text-red-500">*</span>
        </span>
        <input
          {...register("title", { required: true })}
          placeholder="Enter project title"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">Title is required.</p>
        )}
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium mb-1 block">
          Description
        </span>
        <textarea
          {...register("description")}
          placeholder="Enter project description"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 font-medium mb-1 block">Status</span>
        <select
          {...register("status")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={updating}
        className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md transition ${
          updating ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {updating ? "Updating..." : "Update Project"}
      </button>
    </form>
  );
}
