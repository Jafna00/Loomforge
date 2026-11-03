import axiosInstance from './axiosInstance.js';

export async function getOrCreateConversationForRfqApi(rfqId) {
  const { data } = await axiosInstance.get(`/conversations/rfq/${rfqId}`);
  return data.data;
}

export async function getMyConversationsApi() {
  const { data } = await axiosInstance.get('/conversations/mine');
  return data.data;
}

export async function getMessagesApi(conversationId) {
  const { data } = await axiosInstance.get(`/conversations/${conversationId}/messages`);
  return data.data;
}