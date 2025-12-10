// src/api/api.js

import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Penting: import AuthContext

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
}); 

// Interceptor untuk menambahkan token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani token yang kadaluarsa
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Jika terjadi 401, bersihkan token dan redirect ke login
            
            // Jika Anda menggunakan AuthContext, panggil fungsi logout()
            // window.location.href = '/login'; 
            console.error(error);
        }
        return Promise.reject(error);
    }
);

export default api;