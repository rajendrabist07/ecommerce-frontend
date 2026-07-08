import api from "../api/axios";

const unwrap = (response) => response.data?.data ?? response.data;

export const getCart = async () => {
  const response = await api.get("/cart");

  return unwrap(response);
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post("/cart", { productId, quantity });

  return unwrap(response);
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, { quantity });

  return unwrap(response);
};

export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);

  return unwrap(response);
};

export const clearCart = async () => {
  const response = await api.delete("/cart");

  return unwrap(response);
};
