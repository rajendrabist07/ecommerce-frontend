import { useState, useCallback } from "react";

/**
 * useAsync Hook - Handle async operations with loading, data, and error states
 * Production-grade hook for API calls and async operations
 */
export function useAsync(asyncFunction, immediate = true) {
    const [status, setStatus] = useState("idle");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setStatus("pending");
        setData(null);
        setError(null);

        try {
            const response = await asyncFunction(...args);
            setData(response);
            setStatus("success");
            return response;
        } catch (err) {
            setError(err);
            setStatus("error");
            throw err;
        }
    }, [asyncFunction]);

    if (immediate) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useState(() => {
            execute();
        });
    }

    return { execute, status, data, error };
}

/**
 * usePrevious Hook - Track previous value
 */
export function usePrevious(value) {
    const ref = useState(null)[1];

    useState(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

/**
 * useLocalStorage Hook - Persistent state in localStorage
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue];
}

/**
 * useDebounce Hook - Debounce values for search, filters, etc.
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useState(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

/**
 * useThrottle Hook - Throttle function calls
 */
export function useThrottle(callback, delay = 500) {
    const lastRun = useState(Date.now())[1];

    return useCallback((...args) => {
        if (Date.now() - lastRun.current >= delay) {
            callback(...args);
            lastRun.current = Date.now();
        }
    }, [callback, delay]);
}

/**
 * useClickOutside Hook - Detect clicks outside element
 */
export function useClickOutside(ref, callback) {
    useState(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback]);
}

/**
 * useMediaQuery Hook - Responsive design hook
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useState(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

/**
 * useWindowSize Hook - Track window dimensions
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useState(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
