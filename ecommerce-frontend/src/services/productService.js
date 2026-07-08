import api from "../api/axios";

const unwrap = (response) => response.data?.data ?? response.data;

export const normalizeProducts = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  if (Array.isArray(payload?.data)) return payload.data;

  return [];
};

export const normalizeProduct = (payload) => {
  if (payload?.product) return payload.product;
  if (payload?.data?.product) return payload.data.product;
  if (payload?.data && !Array.isArray(payload.data)) return payload.data;

  return payload;
};

export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params });

  return unwrap(response);
};

export const getSingleProduct = async (id) => {
  const response = await api.get(`/products/${id}`);

  return normalizeProduct(unwrap(response));
};

export const createProduct = async (payload) => {
  const response = await api.post("/products", payload);

  return unwrap(response);
};

export const updateProduct = async (id, payload) => {
  const response = await api.put(`/products/${id}`, payload);

  return unwrap(response);
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return unwrap(response);
};
