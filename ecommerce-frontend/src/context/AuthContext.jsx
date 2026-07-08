/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("rajendra_store_user"));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(localStorage.getItem("rajendra_store_token"));

  const signIn = async (credentials) => {
    const session = await authService.login(credentials);
    setUser(session.user || getStoredUser());
    setToken(session.token || localStorage.getItem("rajendra_store_token"));

    return session;
  };

  const signUp = async (payload) => {
    const session = await authService.register(payload);
    setUser(session.user || getStoredUser());
    setToken(session.token || localStorage.getItem("rajendra_store_token"));

    return session;
  };

  const signOut = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
      signIn,
      signOut,
      signUp,
      token,
      user,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
