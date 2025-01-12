import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Konfigurasi store utama
const store = configureStore({
    reducer: {
        auth: authReducer, // Reducer untuk autentikasi
    },
});

export default store;
