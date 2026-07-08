import api from "../api/axios";

const unwrap = (response) => response.data?.data ?? response.data;

const persistSession = (payload) => {
  const token = payload?.token || payload?.accessToken || payload?.jwt;
  const user = payload?.user || payload?.data?.user || payload?.customer;

  if (token) localStorage.setItem("rajendra_store_token", token);
  if (user) localStorage.setItem("rajendra_store_user", JSON.stringify(user));

  return { token, user, raw: payload };
};

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return persistSession(unwrap(response));
};

export const register = async (payload) => {
  const response = await api.post("/auth/register", payload);

  return persistSession(unwrap(response));
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });

  return unwrap(response);
};

export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, { password });

  return unwrap(response);
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");

  return unwrap(response);
};

export const updateProfile = async (payload) => {
  const response = await api.put("/auth/profile", payload);

  return unwrap(response);
};

export const logout = () => {
  localStorage.removeItem("rajendra_store_token");
  localStorage.removeItem("rajendra_store_user");
};
