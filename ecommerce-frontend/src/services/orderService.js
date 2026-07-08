import api from "../api/axios";

const unwrap = (response) => response.data?.data ?? response.data;

export const createOrder = async (payload) => {
  const response = await api.post("/orders", payload);

  return unwrap(response);
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");

  return unwrap(response);
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return unwrap(response);
};

export const getAllOrders = async () => {
  const response = await api.get("/orders");

  return unwrap(response);
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}`, { status });

  return unwrap(response);
};
