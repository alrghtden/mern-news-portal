import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles//EditBerita.css';

const EditBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState(null);
  const [kategori, setKategori] = useState(null);
  

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_RAILWAY_URL}/api/berita/${id}`);
      setJudul(response.data.judul);
      setIsi(response.data.isi);
      setKategori(response.data.kategori);
    } catch (error) {
      console.error('Gagal mengambil data berita:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('isi', isi);
    formData.append('kategori', kategori);
    if (gambar) formData.append('gambar', gambar);

    try {
      await axios.put(`${process.env.REACT_APP_RAILWAY_URL}/api/berita/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/admin/berita');
    } catch (error) {
      console.error('Gagal mengupdate berita:', error);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Berita</h2>
      <form className="edit-form" onSubmit={handleUpdate}>
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
          <label>Upload Gambar Baru (opsional):</label>
          <input type="file" accept="image/*" onChange={(e) => setGambar(e.target.files[0])} />
        </div>
        <button type="submit">Perbarui</button>
      </form>
    </div>
  );
};

export default EditBerita;
