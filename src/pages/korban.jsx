import React, { useState, useEffect } from "react";
import axios from "axios";

const Korban = () => {
    const [dataKorban, setDataKorban] = useState([]); // Menyimpan daftar korban
    const [form, setForm] = useState({ nama: "", alamat: "", kondisi: "", lks_gunung: "" }); // Menyimpan data form
    const [editingId, setEditingId] = useState(null); // Menyimpan ID untuk edit mode
    const [loading, setLoading] = useState(false); // Status loading untuk API request
    const [error, setError] = useState(""); // Menyimpan pesan error
    const API_URL = "http://localhost:5000/korban"; // URL backend Anda

    // Ambil data dari backend
    const fetchData = async () => {
        setLoading(true);
        setError(""); // Reset error
        try {
            const response = await axios.get(API_URL);
            if (Array.isArray(response.data)) {
                setDataKorban(response.data);
            } else {
                throw new Error("Respons dari server tidak valid.");
            }
        } catch (err) {
            console.error("Gagal mengambil data korban:", err);
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

        // Validasi data
        if (!form.nama || !form.alamat || !form.kondisi || !form.lks_gunung) {
            alert("Semua kolom wajib diisi.");
            return;
        }

        try {
            if (editingId) {
                // Edit data
                await axios.put(`${API_URL}/${editingId}`, form);
                alert("Data korban berhasil diperbarui.");
            } else {
                // Tambah data baru
                await axios.post(API_URL, form);
                alert("Data korban berhasil ditambahkan.");
            }

            setForm({ nama: "", alamat: "", kondisi: "", lks_gunung: "" }); // Reset form
            setEditingId(null); // Reset edit mode
            fetchData(); // Refresh data
        } catch (err) {
            console.error("Gagal menyimpan data:", err.response || err.message);
            alert("Terjadi kesalahan saat menyimpan data.");
        }
    };

    // Handle hapus data
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert("Data korban berhasil dihapus.");
                fetchData(); // Refresh data
            } catch (err) {
                console.error("Gagal menghapus data:", err);
                alert("Terjadi kesalahan saat menghapus data.");
            }
        }
    };

    // Set data untuk edit mode
    const handleEdit = (korban) => {
        setEditingId(korban.id);
        setForm({
            nama: korban.nama,
            alamat: korban.alamat,
            kondisi: korban.kondisi,
            lks_gunung: korban.lks_gunung,
        });
    };

    // Ambil data saat komponen dimuat
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Data Korban</h1>

            {loading && <p>Loading data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Form Tambah/Edit Data */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium">Nama Korban</label>
                    <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Nama Korban"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Alamat</label>
                    <input
                        type="text"
                        name="alamat"
                        value={form.alamat}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Alamat Korban"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Kondisi</label>
                    <input
                        type="text"
                        name="kondisi"
                        value={form.kondisi}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Kondisi Korban"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">Lokasi Gunung</label>
                    <input
                        type="text"
                        name="lks_gunung"
                        value={form.lks_gunung}
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

            {/* Daftar Data Korban */}
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">Nama Korban</th>
                        <th className="border border-gray-300 px-4 py-2">Alamat</th>
                        <th className="border border-gray-300 px-4 py-2">Kondisi</th>
                        <th className="border border-gray-300 px-4 py-2">Lokasi Gunung</th>
                        <th className="border border-gray-300 px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(dataKorban) && dataKorban.length > 0 ? (
                        dataKorban.map((korban, index) => (
                            <tr key={korban.id}>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{korban.nama}</td>
                                <td className="border border-gray-300 px-4 py-2">{korban.alamat}</td>
                                <td className="border border-gray-300 px-4 py-2">{korban.kondisi}</td>
                                <td className="border border-gray-300 px-4 py-2">{korban.lks_gunung}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEdit(korban)}
                                        className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(korban.id)}
                                        className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-4">
                                Tidak ada data tersedia.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Korban;
