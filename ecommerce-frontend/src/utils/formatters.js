/**
 * Currency & Number Formatting
 */
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const formatPrice = (value, fractionDigits = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(Number(value || 0));

export const formatNumber = (value) =>
  new Intl.NumberFormat("en-US").format(Number(value || 0));

export const formatPercent = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Number(value || 0));

/**
 * Date & Time Formatting
 */
export const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const formatTime = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
};

/**
 * Product Image Handling
 */
export const getProductImage = (product) =>
  product?.image ||
  product?.thumbnail ||
  product?.images?.[0]?.url ||
  product?.images?.[0] ||
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop";

export const getProductId = (product) => product?._id || product?.id || product?.slug;

/**
 * String Utilities
 */
export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const capitalizeFirst = (text) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

export const truncate = (text, length = 100) =>
  text && text.length > length ? text.substring(0, length) + "..." : text;

/**
 * Validation Utilities
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone) =>
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(
    phone
  );

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Array & Object Utilities
 */
export const uniqueBy = (array, key) =>
  Array.from(new Map(array.map((item) => [item[key], item])).values());

export const groupBy = (array, key) =>
  array.reduce((acc, obj) => {
    const group = obj[key];
    acc[group] = acc[group] || [];
    acc[group].push(obj);
    return acc;
  }, {});

export const sortBy = (array, key, order = "asc") =>
  [...array].sort((a, b) => {
    if (order === "desc") return b[key] - a[key];
    return a[key] - b[key];
  });

export const flatMap = (array, fn) => array.map(fn).flat();

export const chunk = (array, size) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, (i + 1) * size)
  );

/**
 * Storage Utilities
 */
export const storage = {
  get: (key, fallback = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Storage error for key "${key}":`, error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage error removing key "${key}":`, error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  },
};

/**
 * Performance Utilities
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = (fn, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Error Handling
 */
export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
};

/**
 * API Error Parser
 */
export const parseAPIError = (error) => {
  const defaultMessage = "Something went wrong. Please try again.";

  if (!error) return defaultMessage;

  // Axios error
  if (error.response) {
    return (
      error.response.data?.message ||
      error.response.data?.error ||
      error.response.statusText ||
      defaultMessage
    );
  }

  // Network error
  if (error.request) {
    return "Network error. Please check your connection.";
  }

  // Other errors
  return error.message || defaultMessage;
};

/**
 * Async Utilities
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const retry = async (fn, options = {}) => {
  const { maxAttempts = 3, delay = 1000, backoff = true } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;

      const waitTime = backoff ? delay * attempt : delay;
      await sleep(waitTime);
    }
  }
};

/**
 * URL Utilities
 */
export const getQueryParam = (param) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
};

export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString();
};

/**
 * Class Utility - Same as cx but with object support
 */
export const clsx = (value) => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([_, v]) => v)
      .map(([k]) => k)
      .join(" ");
  }
  return "";
};
