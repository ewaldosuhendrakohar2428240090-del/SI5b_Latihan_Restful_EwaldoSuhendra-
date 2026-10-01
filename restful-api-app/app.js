require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function logger(req, res, next) {
	const waktu = new Date().toISOString();
	console.log(`[${waktu}] ${req.method} ${req.url}`);
	next(); // wajib, agar request lanjut ke handler berikutnya
}

// Didaftarkan sebelum route agar mencatat seluruh request
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.get('/', (req, res) => {
	res.send('Server Express.js berjalan!');
});

app.get('/profile', (req, res) => {
	res.send('Ini adalah halaman profil.');
});

app.get('/halaman', (req, res) => {
	res.send('Ini adalah halaman utama.');
});
app.use(express.json());

let mahasiswa = [
	{ id: 1, nama: 'Andi', jurusan: 'Sistem Informasi' },
	{ id: 2, nama: 'Budi', jurusan: 'Informatika' },
];
let nextId = 3;

// app.get('/mahasiswa', (req, res) => {
// 	res.json(mahasiswa);
// });
app.get('/mahasiswa', (req, res) => {
  const { jurusan } = req.query;

  if (jurusan) {
    const hasil = mahasiswa.filter((m) => m.jurusan === jurusan);
    return res.json(hasil);
  }

  res.json(mahasiswa);
});
// GET mahasiswa /mahasiswa?jurusna=sistem Informasi
app.get('/mahasiswa/:id', (req, res) => {
	const jurusan = req.query;
	if (jurusan) {
		const hasil = mahasiswa.filter((m) => m.jurusan === jurusan);
		return res.json(hasil);
	}
	res.json(mahasiswa);
});

app.post('/mahasiswa', (req, res) => {
	const { nama, jurusan } = req.body;

	if (!nama || !jurusan) {
		return res.status(400).json({ message: 'nama dan jurusan wajib diisi' });
	}

	const mahasiswaBaru = { id: nextId++, nama, jurusan };

	mahasiswa.push(mahasiswaBaru);
	res.status(201).json(mahasiswaBaru);
});

// PUT /mahasiswa/2
// Body: { "nama": "Budi Santoso", "jurusan": "Informatika" }
app.put('/mahasiswa/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = mahasiswa.findIndex((m) => m.id === id);

	if (index === -1) {
		return res.status(404).json({ message: 'Data tidak ditemukan' });
	}

	mahasiswa[index] = { ...mahasiswa[index], ...req.body, id };
	res.json(mahasiswa[index]);
});
app.listen(PORT, () => {
	console.log(`Server berjalan di http://localhost:${PORT}`);
});
// PUT /mahasiswa/2
// Body: { "nama": "Budi Santoso", "jurusan": "Informatika" }
app.put('/mahasiswa/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = mahasiswa.findIndex((m) => m.id === id);

	if (index === -1) {
		return res.status(404).json({ message: 'Data tidak ditemukan' });
	}

	mahasiswa[index] = { ...mahasiswa[index], ...req.body, id };
	res.json(mahasiswa[index]);
});