import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProject, ProjectPayload } from "../services/project";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function CreateProject() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectPayload>();

  const onSubmit = async (data: ProjectPayload) => {
    setIsLoading(true);
    try {
      await createProject(data);
      toast.success("Project created successfully!");
      navigate("/dashboard");
      reset();
    } catch (error) {
      toast.error("Failed to create project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 mt-10 bg-gray-50 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Create New Project
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
        disabled={isLoading}
        className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
