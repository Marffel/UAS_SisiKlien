import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-green-700 text-white flex flex-col">
                <div className="p-4 text-center font-bold text-lg border-b border-green-600">
                    Aplikasi Data Gunung Merapi
                </div>
                <nav className="flex-grow p-4">
                    <ul>
                        <li className="mb-2">
                            <Link to="/admin" className="block py-2 px-4 hover:bg-green-600 rounded">
                                Dashboard
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/admin/gunung" className="block py-2 px-4 hover:bg-green-600 rounded">
                                Data Gunung
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link to="/admin/korban" className="block py-2 px-4 hover:bg-green-600 rounded">
                                Data Korban
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-green-600">
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            <div className="flex-grow flex flex-col">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Dashboard Kebencanaan</h1>
                    <div className="text-sm text-gray-600">
                        Welcome
                    </div>
                </header>

                {/* Content */}
                <main className="flex-grow p-4">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-white p-4 text-center border-t">
                    &copy; {new Date().getFullYear()} Aplikasi Data Gunung Merapi. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;
