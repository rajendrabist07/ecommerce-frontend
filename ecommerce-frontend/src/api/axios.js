import axios from "axios";
import { logAPIRequest, logAPIResponse, logError } from "../utils/logger";
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from "../constants";
import { parseAPIError } from "../utils/formatters";

// Create axios instance with production-grade configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // Include cookies in requests
});

/**
 * Request Interceptor
 * Adds authorization token and logs requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log the request
    logAPIRequest(config.method.toUpperCase(), config.url, config.data);

    return config;
  },
  (error) => {
    logError("Request Interceptor Error", error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles errors, logs responses, and manages token expiration
 */
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    logAPIResponse(
      response.config.method.toUpperCase(),
      response.config.url,
      response.status,
      response.data
    );

    return response;
  },
  (error) => {
    const config = error.config;

    // Handle network errors
    if (!error.response) {
      logError("Network Error", error, { url: config?.url });
      return Promise.reject(
        new Error(
          "Network error. Please check your internet connection and try again."
        )
      );
    }

    const status = error.response.status;
    const errorData = error.response.data;

    // Log the error
    logAPIResponse(
      config.method.toUpperCase(),
      config.url,
      status,
      errorData
    );

    // Handle 401 (Unauthorized) - Token expired or invalid
    if (status === 401) {
      // Clear stored auth data
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);

      // Redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }

      return Promise.reject(
        new Error("Session expired. Please log in again.")
      );
    }

    // Handle 403 (Forbidden)
    if (status === 403) {
      logError("Forbidden Access", error, { url: config.url });
      return Promise.reject(
        new Error("You do not have permission to access this resource.")
      );
    }

    // Handle 404 (Not Found)
    if (status === 404) {
      return Promise.reject(
        new Error("The requested resource was not found.")
      );
    }

    // Handle 500 (Server Error)
    if (status >= 500) {
      logError("Server Error", error, { url: config.url, status });
      return Promise.reject(
        new Error("Server error. Please try again later.")
      );
    }

    // Extract error message
    const message = parseAPIError(error);

    logError("API Error", error, { url: config.url, status, message });

    return Promise.reject(new Error(message));
  }
);

export default api;
