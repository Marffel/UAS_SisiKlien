// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import mysql from 'mysql';

// // Inisialisasi Express
// const app = express();

// // Middleware
// app.use(cors()); // Mengizinkan Cross-Origin Requests
// app.use(bodyParser.json()); // Parsing JSON

// // Konfigurasi Database
// const db = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'bencana_gunung',
// });

// // Koneksi Database
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         process.exit(1);
//     }
//     console.log('Database connected...');
// });

// // Endpoint GET /gunung
// app.get('/gunung', (req, res) => {
//     const sql = 'SELECT * FROM gunung';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Kesalahan saat mengambil data gunung:', err);
//             return res.status(500).json({ error: 'Terjadi kesalahan server' });
//         }
//         res.json(results);
//     });
// });

// // Endpoint POST /gunung
// app.post('/gunung', (req, res) => {
//     const { nama, tinggi, lokasi } = req.body;

//     // Validasi input
//     if (!nama || !tinggi || !lokasi) {
//         return res.status(400).json({ error: 'Semua kolom wajib diisi.' });
//     }

//     const sql = 'INSERT INTO gunung (nama, tinggi, lokasi) VALUES (?, ?, ?)';
//     db.query(sql, [nama, tinggi, lokasi], (err, result) => {
//         if (err) {
//             console.error('Kesalahan saat menambahkan data gunung:', err);
//             return res.status(500).json({ error: 'Gagal menambahkan data ke database.' });
//         }
//         res.json({ id: result.insertId, nama, tinggi, lokasi });
//     });
// });

// // Menangani 404
// app.use((req, res) => {
//     res.status(404).json({ error: 'Requested resource could not be found.' });
// });

// // Jalankan Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
