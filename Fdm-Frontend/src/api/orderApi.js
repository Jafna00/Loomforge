import axiosInstance from './axiosInstance.js';

export async function getMyOrdersAsDesignerApi() {
  const { data } = await axiosInstance.get('/orders/designer/mine');
  return data.data;
}

export async function getMyOrdersAsManufacturerApi() {
  const { data } = await axiosInstance.get('/orders/manufacturer/mine');
  return data.data;
}

export async function getOrderByIdApi(id) {
  const { data } = await axiosInstance.get(`/orders/${id}`);
  return data.data;
}

export async function updateProductionStageApi(id, stage) {
  const { data } = await axiosInstance.patch(`/orders/${id}/stage`, { stage });
  return data.data;
}