import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Add.css';

const TambahBerita = () => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState('');
  const [gambar, setGambar] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('isi', isi);
    formData.append('kategori', kategori);
    if (gambar) formData.append('gambar', gambar);

    try {
      await axios.post(`${process.env.RAILWAY_URL}/api/berita`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/admin/berita');
    } catch (error) {
      console.error('Gagal menambahkan berita:', error);
    }
  };

  return (
    <div className="tambah-container">
      <h2>Tambah Berita</h2>
      <form className="tambah-form" onSubmit={handleSubmit}>
        <div>
          <label>Judul:</label>
          <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
        </div>
        <div>
          <label>Isi Berita:</label>
          <textarea value={isi} onChange={(e) => setIsi(e.target.value)} required />
        </div>
        <div>
          <label>Kategori:</label>
          <input type="text" value={kategori} onChange={(e) => setKategori(e.target.value)} required />
        </div>
        <div>
          <label>Upload Gambar:</label>
          <input type="file" accept="image/*" onChange={(e) => setGambar(e.target.files[0])} />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default TambahBerita;
