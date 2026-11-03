import axiosInstance from './axiosInstance.js';

export async function getMyManufacturerProfileApi() {
  const { data } = await axiosInstance.get('/manufacturer-profile/me');
  return data.data;
}

export async function saveManufacturerProfileApi(payload) {
  const { data } = await axiosInstance.put('/manufacturer-profile/me', payload);
  return data.data;
}

export async function getAllManufacturersApi(filters = {}) {
  const { data } = await axiosInstance.get('/manufacturer-profile', { params: filters });
  return data.data;
}

export async function getManufacturerByIdApi(id) {
  const { data } = await axiosInstance.get(`/manufacturer-profile/${id}`);
  return data.data;
}