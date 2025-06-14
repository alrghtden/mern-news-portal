const Berita = require('../models/Berita');
const cloudinary = require('../config/cloudinary');

exports.getAllBerita = async (req, res) => {
  try {
    const berita = await Berita.find().sort({ tanggal: -1 });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil berita' });
  }
};

exports.getBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) return res.status(404).json({ error: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (err) {
    res.status(404).json({ error: 'Berita tidak ditemukan' });
  }
};

exports.createBerita = async (req, res) => {
  const { judul, isi, kategori } = req.body;

  try {
    let gambar = null;
    let gambarPublicId = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'berita'
      });

      gambar = uploadResult.secure_url;
      gambarPublicId = uploadResult.public_id;
    }

    const newBerita = new Berita({
      judul,
      isi,
      kategori,
      gambar,
      gambarPublicId,
    });

    await newBerita.save();
    res.status(201).json(newBerita);
  } catch (err) {
    console.error('Gagal membuat berita:', err.message);
    console.error(err.stack); // Tampilkan stacktrace error
    console.error(err);
    res.status(400).json({ error: 'Gagal membuat berita' });
  }
};

exports.updateBerita = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) return res.status(404).json({ error: 'Berita tidak ditemukan' });

    const { judul, isi, kategori } = req.body;
    berita.judul = judul;
    berita.isi = isi;
    berita.kategori = kategori;

    if (req.file) {
      if (berita.gambarPublicId) {
        await cloudinary.uploader.destroy(berita.gambarPublicId);
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'berita',
      });

      berita.gambar = uploadResult.secure_url;
      berita.gambarPublicId = uploadResult.public_id;
    }

    await berita.save();
    res.json(berita);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengupdate berita' });
  }
};

exports.deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findByIdAndDelete(req.params.id);
    if (!berita) return res.status(404).json({ error: 'Berita tidak ditemukan' });

    // Hapus gambar dari Cloudinary jika ada
    if (berita.gambarPublicId) {
      await cloudinary.uploader.destroy(berita.gambarPublicId);
    }

    res.json({ message: 'Berita berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Gagal menghapus berita' });
  }
};
