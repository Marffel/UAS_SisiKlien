import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Logika register Anda di sini
        navigate("/"); // Navigasi ke halaman login setelah registrasi berhasil
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Nama"
                            required
                        />
                    </div>
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
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Sudah punya akun?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="text-green-600 hover:underline"
                        >
                            Login di sini
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
