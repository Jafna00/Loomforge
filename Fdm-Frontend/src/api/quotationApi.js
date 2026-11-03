import axiosInstance from './axiosInstance.js';

export async function createQuotationApi(payload) {
  const { data } = await axiosInstance.post('/quotations', payload);
  return data.data;
}

export async function getQuotationsForProjectApi(projectId) {
  const { data } = await axiosInstance.get(`/quotations/project/${projectId}`);
  return data.data;
}

export async function getMySubmittedQuotationsApi() {
  const { data } = await axiosInstance.get('/quotations/mine');
  return data.data;
}

export async function getQuotationByIdApi(id) {
  const { data } = await axiosInstance.get(`/quotations/${id}`);
  return data.data;
}

export async function acceptQuotationApi(id) {
  const { data } = await axiosInstance.patch(`/quotations/${id}/accept`);
  return data.data;
}

export async function getMyQuotationsAsDesignerApi() {
  const { data } = await axiosInstance.get('/quotations/designer/mine');
  return data.data;
}