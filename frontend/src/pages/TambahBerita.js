import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { generateUploadButton } from '@uploadthing/react';
import '../styles/Add.css';

const UploadButton = generateUploadButton({
  url: 'https://mern-news-portal-backend-production.up.railway.app/api/uploadthing', // Ganti dengan URL backend kamu
});

const TambahBerita = () => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [kategori, setKategori] = useState('');
  const [gambarUrl, setGambarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_RAILWAY_URL}/api/berita`, {
        judul,
        isi,
        kategori,
        gambar: gambarUrl,
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
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Isi Berita:</label>
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kategori:</label>
          <input
            type="text"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Gambar:</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setGambarUrl(res[0].url);
              alert('Gambar berhasil diunggah!');
            }}
            onUploadError={(error) => {
              console.error(error);
              alert('Gagal mengunggah gambar.');
            }}
            onUploadBegin={() => setUploading(true)}
          />
          {uploading && !gambarUrl && (
            <p>Mengunggah gambar...</p>
          )}
          {gambarUrl && (
            <img
              src={gambarUrl}
              alt="Preview"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )}
        </div>
        <button type="submit" disabled={!gambarUrl}>
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TambahBerita;
