import React, { useState, useEffect } from "react";
import axios from "axios";

const Gunung = () => {
    const [dataGunung, setDataGunung] = useState([]); 
    const [form, setForm] = useState({ nama: "", tinggi: "", lokasi: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 
    const API_URL = "http://localhost:5000/gunung"; 

    // Ambil data
    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:5000/gunung");
            console.log("Respons dari backend:", response.data);
            if (Array.isArray(response.data)) {
                setDataGunung(response.data);
            } else {
                throw new Error("Respons dari server tidak valid.");
            }
        } catch (err) {
            console.error("Gagal mengambil data gunung:", err);
            setError("Gagal mengambil data. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    // Handle perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle submit untuk tambah atau edit data
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama || !form.tinggi || !form.lokasi) {
        alert("Semua kolom wajib diisi.");
        return;
    }

    try {
        if (editingId) {
            // Edit data
            await axios.put(`${API_URL}/${editingId}`, form);
            alert("Data gunung berhasil diperbarui.");
        } else {
            // Tambah data baru
            await axios.post(API_URL, form);
            alert("Data gunung berhasil ditambahkan.");
        }

        setForm({ nama: "", tinggi: "", lokasi: "" }); // Reset form
        setEditingId(null); // Reset edit mode
        fetchData(); // Refresh data
    } catch (error) {
        console.error("Gagal menyimpan data:", error.response || error.message);
        alert("Terjadi kesalahan saat menyimpan data.");
    }
};


    // Handle hapus data
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert("Data gunung berhasil dihapus.");
                fetchData(); // Refresh data
            } catch (error) {
                console.error("Gagal menghapus data:", error);
                alert("Terjadi kesalahan saat menghapus data.");
            }
        }
    };

    // Set data untuk edit mode
    const handleEdit = (gunung) => {
        setEditingId(gunung.id);
        setForm({ nama: gunung.nama, tinggi: gunung.tinggi, lokasi: gunung.lokasi });
    };

    // Ambil data saat komponen dimuat
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Data Gunung</h1>

            {loading && <p>Loading data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Form Tambah/Edit Data */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium">Nama Gunung</label>
                    <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Nama Gunung"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Tinggi (meter)</label>
                    <input
                        type="number"
                        name="tinggi"
                        value={form.tinggi}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Tinggi Gunung"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Lokasi</label>
                    <input
                        type="text"
                        name="lokasi"
                        value={form.lokasi}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Lokasi Gunung"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {editingId ? "Perbarui Data" : "Tambah Data"}
                </button>
            </form>

            {/* Daftar Data Gunung */}
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">Nama Gunung</th>
                        <th className="border border-gray-300 px-4 py-2">Tinggi (m)</th>
                        <th className="border border-gray-300 px-4 py-2">Lokasi</th>
                        <th className="border border-gray-300 px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(dataGunung) && dataGunung.length > 0 ? (
                        dataGunung.map((gunung, index) => (
                            <tr key={gunung.id}>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{gunung.nama}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {gunung.tinggi}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{gunung.lokasi}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEdit(gunung)}
                                        className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(gunung.id)}
                                        className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center p-4">
                                Tidak ada data tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Gunung;
