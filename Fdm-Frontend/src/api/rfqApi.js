import axiosInstance from './axiosInstance.js';

export async function createRfqApi(payload) {
  const { data } = await axiosInstance.post('/rfqs', payload);
  return data.data;
}

export async function getMySentRfqsApi() {
  const { data } = await axiosInstance.get('/rfqs/sent');
  return data.data;
}

export async function getMyReceivedRfqsApi() {
  const { data } = await axiosInstance.get('/rfqs/received');
  return data.data;
}

export async function getRfqByIdApi(id) {
  const { data } = await axiosInstance.get(`/rfqs/${id}`);
  return data.data;
}

export async function markRfqReviewedApi(id) {
  const { data } = await axiosInstance.patch(`/rfqs/${id}/review`);
  return data.data;
}