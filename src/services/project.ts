// src/services/projectService.ts
import api from "../axios";

export interface ProjectPayload {
  title: string;
  description?: string;
  status?: "to_do" | "in_progress" | "completed";
}

export interface Project extends ProjectPayload {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");
  return response.data;
};

export const getProjectById = async (id: number): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data: ProjectPayload): Promise<Project> => {
  const response = await api.post("/projects", data);
  return response.data;
};

export const updateProject = async (
  id: number,
  data: ProjectPayload
): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
