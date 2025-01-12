import { createSlice } from '@reduxjs/toolkit';

// State awal untuk autentikasi
const initialState = {
    user: null, // Menyimpan data pengguna
    token: null, // Menyimpan token JWT
    isAuthenticated: false, // Status autentikasi
};

// Slice untuk autentikasi
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action untuk login
        login: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('token', token); // Simpan token ke localStorage
        },
        // Action untuk logout
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); // Hapus token dari localStorage
        },
    },
});

// Export action dan reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
