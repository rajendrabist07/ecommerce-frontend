/**
 * Application Constants
 * Centralized configuration and constants
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

// Feature Flags
export const FEATURES = {
    ANIMATIONS: import.meta.env.VITE_ENABLE_ANIMATIONS !== "false",
    DARK_MODE: import.meta.env.VITE_ENABLE_DARK_MODE !== "false",
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: "rajendra_store_token",
    AUTH_USER: "rajendra_store_user",
    CART: "rajendra_store_cart",
    WISHLIST: "rajendra_store_wishlist",
    THEME: "rajendra_store_theme",
    PREFERENCES: "rajendra_store_preferences",
};

// User Roles
export const USER_ROLES = {
    CUSTOMER: "customer",
    ADMIN: "admin",
    VENDOR: "vendor",
};

// Product Categories
export const PRODUCT_CATEGORIES = [
    { id: "electronics", label: "Electronics", icon: "Zap" },
    { id: "clothing", label: "Clothing", icon: "ShoppingBag" },
    { id: "books", label: "Books", icon: "Book" },
    { id: "home", label: "Home & Garden", icon: "Home" },
    { id: "sports", label: "Sports", icon: "Activity" },
];

// Order Statuses
export const ORDER_STATUS = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
};

// Order Status Colors
export const ORDER_STATUS_COLORS = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

// Payment Methods
export const PAYMENT_METHODS = {
    CARD: "card",
    BANK_TRANSFER: "bank_transfer",
    CASH_ON_DELIVERY: "cod",
    WALLET: "wallet",
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
};

// Validation Rules
export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 128,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 255,
    PHONE_PATTERN: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
};

// Time Constants
export const TIME = {
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
};

// URLs
export const URLS = {
    HOME: "/",
    PRODUCTS: "/products",
    PRODUCT_DETAIL: "/products/:id",
    CART: "/cart",
    CHECKOUT: "/checkout",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:token",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    ORDERS: "/orders",
    WISHLIST: "/wishlist",
    ADMIN: "/admin",
    NOT_FOUND: "/404",
};

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
    UPDATE_PROFILE: "/auth/profile",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",

    // Products
    PRODUCTS: "/products",
    PRODUCT_DETAIL: "/products/:id",
    CREATE_PRODUCT: "/products",
    UPDATE_PRODUCT: "/products/:id",
    DELETE_PRODUCT: "/products/:id",

    // Categories
    CATEGORIES: "/categories",
    CATEGORY_DETAIL: "/categories/:id",

    // Orders
    ORDERS: "/orders",
    CREATE_ORDER: "/orders",
    ORDER_DETAIL: "/orders/:id",
    UPDATE_ORDER_STATUS: "/orders/:id/status",

    // Cart
    CART: "/cart",
    ADD_TO_CART: "/cart/add",
    REMOVE_FROM_CART: "/cart/:id",
    CLEAR_CART: "/cart/clear",

    // Wishlist
    WISHLIST: "/wishlist",
    ADD_TO_WISHLIST: "/wishlist/add",
    REMOVE_FROM_WISHLIST: "/wishlist/:id",
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network error. Please check your connection.",
    SERVER_ERROR: "Server error. Please try again later.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    UNAUTHORIZED: "You are not authorized to access this resource.",
    FORBIDDEN: "You do not have permission to access this resource.",
    NOT_FOUND: "Resource not found.",
    VALIDATION_ERROR: "Please check your input and try again.",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: "Logged in successfully.",
    LOGOUT_SUCCESS: "Logged out successfully.",
    REGISTRATION_SUCCESS: "Account created successfully. Please log in.",
    PROFILE_UPDATED: "Profile updated successfully.",
    PRODUCT_CREATED: "Product created successfully.",
    PRODUCT_UPDATED: "Product updated successfully.",
    PRODUCT_DELETED: "Product deleted successfully.",
    ORDER_PLACED: "Order placed successfully.",
    ADDED_TO_CART: "Item added to cart.",
    REMOVED_FROM_CART: "Item removed from cart.",
    ADDED_TO_WISHLIST: "Item added to wishlist.",
    REMOVED_FROM_WISHLIST: "Item removed from wishlist.",
};

export default {
    API_BASE_URL,
    API_TIMEOUT,
    FEATURES,
    STORAGE_KEYS,
    USER_ROLES,
    PRODUCT_CATEGORIES,
    ORDER_STATUS,
    ORDER_STATUS_COLORS,
    PAYMENT_METHODS,
    PAGINATION,
    VALIDATION,
    TIME,
    URLS,
    API_ENDPOINTS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
};
