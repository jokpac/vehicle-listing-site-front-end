import axios from 'axios';

// Base URL
const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor for Authorization Header
instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const token = user?.accessToken || sessionStorage.getItem("authToken");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for Retry Logic and Error Handling
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Retry logic: only retry on timeout or ECONNABORTED error
        if (error.code === 'ECONNABORTED' && !originalRequest._retry) {
            originalRequest._retry = true;
            originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

            if (originalRequest._retryCount <= 3) {
                return instance(originalRequest);
            }
        }

        // Handle 401 Unauthorized errors
        if (error.response && error.response.status === 401) {
            console.error("Authentication error: Token expired or invalid.");
            sessionStorage.removeItem("user");
            window.location.reload();
        }

        return Promise.reject(error);
    }
);

export default instance;