import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const user = JSON.parse(sessionStorage.getItem("user"));

if (user && user.accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
}

instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("authToken");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Authentication error: Token expired or invalid.");
            sessionStorage.removeItem("user");
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default instance;