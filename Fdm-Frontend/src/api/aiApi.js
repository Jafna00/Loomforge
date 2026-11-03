import axiosInstance from './axiosInstance.js';

export async function analyzeRequirementApi(text) {
  const { data } = await axiosInstance.post('/ai/analyze-requirement', { text });
  return data.data;
}

export async function recommendManufacturersApi(projectId) {
  const { data } = await axiosInstance.get(`/ai/recommend-manufacturers/${projectId}`);
  return data.data;
}