/**
 * Application Configuration
 * Centralized app settings and configurations
 */

export const config = {
    // App Info
    app: {
        name: import.meta.env.VITE_APP_NAME || "Rajendra Store",
        version: import.meta.env.VITE_APP_VERSION || "1.0.0",
        environment: import.meta.env.VITE_APP_ENVIRONMENT || "production",
    },

    // API Configuration
    api: {
        baseURL: import.meta.env.VITE_API_URL || "https://e-commerce-backend-api-0kvd.onrender.com/api",
        timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
        corsOrigin: import.meta.env.VITE_CORS_ORIGIN || "https://ecommerce-rajendra.vercel.app",
        retryAttempts: 3,
        retryDelay: 1000,
    },

    // Cloudinary Configuration
    cloudinary: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        maxFileSize: 10 * 1024 * 1024, // 10MB
    },

    // Analytics
    analytics: {
        googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
        sentryDsn: import.meta.env.VITE_SENTRY_DSN,
    },

    // Features
    features: {
        animations: import.meta.env.VITE_ENABLE_ANIMATIONS !== "false",
        darkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== "false",
        productReviews: true,
        wishlist: true,
        cart: true,
        checkout: true,
        admin: true,
    },

    // UI Configuration
    ui: {
        theme: {
            primary: "#000000",
            secondary: "#f8fafc",
            danger: "#ef4444",
            success: "#10b981",
            warning: "#f59e0b",
        },
        animationDuration: 300,
        pageLoadingDelay: 500,
    },

    // Pagination
    pagination: {
        defaultLimit: 20,
        maxLimit: 100,
        pageSizes: [10, 20, 50, 100],
    },

    // Validation
    validation: {
        passwordMinLength: 6,
        passwordMaxLength: 128,
        nameMinLength: 2,
        nameMaxLength: 100,
    },

    // Cache Configuration
    cache: {
        enabled: true,
        ttl: 5 * 60 * 1000, // 5 minutes
    },

    // Error Handling
    errorHandling: {
        showErrorBoundary: true,
        logErrors: true,
        retryFailedRequests: true,
    },

    // Session Configuration
    session: {
        tokenRefreshInterval: 50 * 60 * 1000, // 50 minutes
        sessionTimeout: 60 * 60 * 1000, // 1 hour
    },

    // Development
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    isPreview: import.meta.env.MODE === "preview",
};

export default config;
