import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors, e.g., redirect to login
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            // Optionally dispatch a logout action if using Redux
            // store.dispatch(setLogout());
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient; 