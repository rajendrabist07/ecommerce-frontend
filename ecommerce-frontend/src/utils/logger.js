/**
 * Logger Utility - Production-grade logging
 * Centralized logging with environment-aware behavior
 */

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Log Levels
const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
};

// Current log level
let currentLogLevel = isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN;

/**
 * Get timestamp for logs
 */
const getTimestamp = () => {
    return new Date().toISOString();
};

/**
 * Format log message
 */
const formatMessage = (level, title, message, data = null) => {
    const timestamp = getTimestamp();
    const prefix = `[${timestamp}] [${level}]`;

    if (data) {
        return { prefix, title, message, data };
    }
    return { prefix, title, message };
};

/**
 * Error Logger
 */
export const logError = (title, error, context = {}) => {
    if (currentLogLevel < LOG_LEVELS.ERROR) return;

    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;

    console.error(`❌ ${title}`, {
        message,
        stack,
        context,
        timestamp: getTimestamp(),
    });

    // Send to error tracking service in production
    if (isProduction && error instanceof Error) {
        sendToErrorTracking(title, error, context);
    }
};

/**
 * Warning Logger
 */
export const logWarn = (title, message, data = null) => {
    if (currentLogLevel < LOG_LEVELS.WARN) return;

    console.warn(`⚠️  ${title}: ${message}`, data || "");
};

/**
 * Info Logger
 */
export const logInfo = (title, message, data = null) => {
    if (currentLogLevel < LOG_LEVELS.INFO) return;

    console.log(`ℹ️  ${title}: ${message}`, data || "");
};

/**
 * Debug Logger
 */
export const logDebug = (title, message, data = null) => {
    if (currentLogLevel < LOG_LEVELS.DEBUG) return;

    console.log(`🐛 ${title}: ${message}`, data || "");
};

/**
 * API Request Logger
 */
export const logAPIRequest = (method, url, data = null) => {
    if (currentLogLevel < LOG_LEVELS.DEBUG) return;

    console.log(`🔗 API ${method} ${url}`, data ? { data } : "");
};

/**
 * API Response Logger
 */
export const logAPIResponse = (method, url, status, data = null) => {
    if (currentLogLevel < LOG_LEVELS.DEBUG) return;

    const statusColor = status >= 400 ? "❌" : status >= 300 ? "⚠️ " : "✅";
    console.log(`${statusColor} API Response ${method} ${url} [${status}]`, data || "");
};

/**
 * Set Log Level
 */
export const setLogLevel = (level) => {
    currentLogLevel = level;
    logInfo("Logger", `Log level set to ${Object.keys(LOG_LEVELS).find(k => LOG_LEVELS[k] === level)}`);
};

/**
 * Get Log Level
 */
export const getLogLevel = () => currentLogLevel;

/**
 * Send error to external tracking service
 * (e.g., Sentry, Bugsnag, Rollbar)
 */
const sendToErrorTracking = (title, error, context) => {
    try {
        // Placeholder for error tracking service
        // Example: if (window.Sentry) { Sentry.captureException(error); }
        logDebug("ErrorTracking", "Error logged", { title, context });
    } catch (err) {
        console.error("Failed to send error to tracking service", err);
    }
};

/**
 * Performance Logger
 */
export const logPerformance = (label) => {
    if (currentLogLevel < LOG_LEVELS.DEBUG) return;

    const start = performance.now();

    return () => {
        const end = performance.now();
        const duration = (end - start).toFixed(2);
        logDebug("Performance", `${label} took ${duration}ms`);
    };
};

/**
 * Async Error Handler
 */
export const withErrorHandler = (fn) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            logError("Async Function Error", error);
            throw error;
        }
    };
};

export default {
    logError,
    logWarn,
    logInfo,
    logDebug,
    logAPIRequest,
    logAPIResponse,
    setLogLevel,
    getLogLevel,
    logPerformance,
    withErrorHandler,
    LOG_LEVELS,
};
