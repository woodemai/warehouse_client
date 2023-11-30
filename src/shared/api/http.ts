import { AuthResponse } from "@/entities/user/models/AuthResponse";
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})
api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/v1/auth/refresh`, { withCredentials: true, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return api.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error
})

export default api;