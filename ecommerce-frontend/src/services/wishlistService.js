import api from "../api/axios";

const unwrap = (response) => response.data?.data ?? response.data;

export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return unwrap(response);
};

export const addToWishlist = async (productId) => {
  const response = await api.post("/wishlist", { productId });

  return unwrap(response);
};

export const removeFromWishlist = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);

  return unwrap(response);
};
