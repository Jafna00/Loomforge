import axiosInstance from './axiosInstance.js';

export async function getMyDesignerProfileApi() {
  const { data } = await axiosInstance.get('/designer-profile/me');
  return data.data;
}

export async function saveDesignerProfileApi(payload) {
  const { data } = await axiosInstance.put('/designer-profile/me', payload);
  return data.data;
}