import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Logika login Anda di sini
        const dummyToken = "dummyToken"; // Ganti dengan logika login sebenarnya
        localStorage.setItem("token", dummyToken); // Simpan token ke localStorage
        navigate("/admin"); // Navigasi ke dashboard admin setelah login berhasil
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Belum punya akun?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className="text-green-600 hover:underline"
                        >
                            Daftar di sini
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
