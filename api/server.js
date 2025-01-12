import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();

const app = express();

// Konfigurasi CORS
const corsOptions = {
    origin: 'http://localhost:5000', // URL frontend React.js
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Secret key untuk JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Koneksi Database
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bencana_gunung',
    connectionLimit: 10
});

// Middleware Autentikasi
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token tidak valid' });
        }
        req.user = user;
        next();
    });
}

// ===================== API Gunung =====================
app.get('/gunung', (req, res) => {
    pool.query('SELECT * FROM gunung', (err, results) => {
        if (err) {
            console.error('Kesalahan saat mengambil data gunung:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan server' });
        }
        res.json(results);
    });
});

app.post('/gunung', authenticateToken, (req, res) => {
    const { nama, tinggi, lokasi } = req.body;

    if (!nama || !tinggi || !lokasi) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi.' });
    }

    pool.query(
        'INSERT INTO gunung (nama, tinggi, lokasi) VALUES (?, ?, ?)',
        [nama, tinggi, lokasi],
        (err, result) => {
            if (err) {
                console.error('Kesalahan saat menambahkan data gunung:', err);
                return res.status(500).json({ error: 'Gagal menambahkan data.' });
            }
            res.status(201).json({ id: result.insertId, nama, tinggi, lokasi });
        }
    );
});

app.put('/gunung/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { nama, tinggi, lokasi } = req.body;

    if (!nama || !tinggi || !lokasi) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi.' });
    }

    pool.query(
        'UPDATE gunung SET nama = ?, tinggi = ?, lokasi = ? WHERE id = ?',
        [nama, tinggi, lokasi, id],
        (err, result) => {
            if (err) {
                console.error('Kesalahan saat memperbarui data gunung:', err);
                return res.status(500).json({ error: 'Gagal memperbarui data.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data tidak ditemukan.' });
            }
            res.json({ id, nama, tinggi, lokasi });
        }
    );
});

app.delete('/gunung/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM gunung WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Kesalahan saat menghapus data gunung:', err);
            return res.status(500).json({ error: 'Gagal menghapus data.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Data tidak ditemukan.' });
        }
        res.json({ message: `Data gunung dengan ID ${id} berhasil dihapus.` });
    });
});

// ===================== API Korban =====================
app.get('/korban', (req, res) => {
    pool.query('SELECT * FROM korban', (err, results) => {
        if (err) {
            console.error('Kesalahan saat mengambil data korban:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan server' });
        }
        res.json(results);
    });
});

app.post('/korban', authenticateToken, (req, res) => {
    const { nama, alamat, kondisi, lks_gunung } = req.body;

    if (!nama || !alamat || !kondisi || !lks_gunung) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi.' });
    }

    pool.query(
        'INSERT INTO korban (nama, alamat, kondisi, lks_gunung) VALUES (?, ?, ?, ?)',
        [nama, alamat, kondisi, lks_gunung],
        (err, result) => {
            if (err) {
                console.error('Kesalahan saat menambahkan data korban:', err);
                return res.status(500).json({ error: 'Gagal menambahkan data.' });
            }
            res.status(201).json({ id: result.insertId, nama, alamat, kondisi, lks_gunung });
        }
    );
});

app.put('/korban/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { nama, alamat, kondisi, lks_gunung } = req.body;

    if (!nama || !alamat || !kondisi || !lks_gunung) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi.' });
    }

    pool.query(
        'UPDATE korban SET nama = ?, alamat = ?, kondisi = ?, lks_gunung = ? WHERE id = ?',
        [nama, alamat, kondisi, lks_gunung, id],
        (err, result) => {
            if (err) {
                console.error('Kesalahan saat memperbarui data korban:', err);
                return res.status(500).json({ error: 'Gagal memperbarui data.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data tidak ditemukan.' });
            }
            res.json({ id, nama, alamat, kondisi, lks_gunung });
        }
    );
});

app.delete('/korban/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM korban WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Kesalahan saat menghapus data korban:', err);
            return res.status(500).json({ error: 'Gagal menghapus data.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Data tidak ditemukan.' });
        }
        res.json({ message: `Data korban dengan ID ${id} berhasil dihapus.` });
    });
});

// ===================== Autentikasi =====================
app.post('/register', async (req, res) => {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
        return res.status(400).json({ error: 'Semua kolom wajib diisi.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
            'INSERT INTO user (nama, email, password) VALUES (?, ?, ?)',
            [nama, email, hashedPassword],
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ error: 'Email sudah terdaftar.' });
                    }
                    console.error('Kesalahan saat registrasi:', err);
                    return res.status(500).json({ error: 'Gagal melakukan registrasi.' });
                }
                res.json({ message: 'Registrasi berhasil.', userId: result.insertId });
            }
        );
    } catch (error) {
        console.error('Kesalahan server saat registrasi:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server.' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email dan password wajib diisi.' });
    }

    pool.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Terjadi kesalahan server.' });
        if (results.length === 0) return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Password salah.' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login berhasil.', token });
    });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
