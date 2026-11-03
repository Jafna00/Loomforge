import axiosInstance, { setAccessToken } from './axiosInstance.js';

export async function registerApi({ name, email, password, role }) {
  const { data } = await axiosInstance.post('/auth/register', { name, email, password, role });
  setAccessToken(data.data.accessToken);
  return data.data.user;
}

export async function loginApi({ email, password }) {
  const { data } = await axiosInstance.post('/auth/login', { email, password });
  setAccessToken(data.data.accessToken);
  return data.data.user;
}

export async function logoutApi() {
  await axiosInstance.post('/auth/logout');
  setAccessToken(null);
}

export async function getMeApi() {
  const { data } = await axiosInstance.get('/auth/me');
  return data.data;
}

export async function refreshApi() {
  const { data } = await axiosInstance.post('/auth/refresh');
  setAccessToken(data.data.accessToken);
  return data.data.accessToken;
}