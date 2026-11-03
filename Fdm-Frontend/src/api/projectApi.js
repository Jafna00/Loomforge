import axiosInstance from './axiosInstance.js';

export async function createProjectApi(payload) {
  const { data } = await axiosInstance.post('/projects', payload);
  return data.data;
}

export async function getMyProjectsApi() {
  const { data } = await axiosInstance.get('/projects/mine');
  return data.data;
}

export async function getProjectByIdApi(id) {
  const { data } = await axiosInstance.get(`/projects/${id}`);
  return data.data;
}