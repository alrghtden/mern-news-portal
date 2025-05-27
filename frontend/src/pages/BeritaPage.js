import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Page.css';

const BeritaPage = () => {
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await axios.get(`${process.env.RAILWAY_URL}/api/berita`);
      setBeritaList(response.data);
    } catch (error) {
      console.error('Gagal mengambil data berita:', error);
    }
  };

  const deleteBerita = async (id) => {
    if (window.confirm('Yakin ingin menghapus berita ini?')) {
      try {
        await axios.delete(`${process.env.RAILWAY_URL}/api/berita/${id}`);
        fetchBerita();
      } catch (error) {
        console.error('Gagal menghapus berita:', error);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="tambah-berita">
        <h2>Daftar Berita</h2>
        <Link to="/admin/add-berita">+ Tambah Berita</Link>
      </div>

      {beritaList.length === 0 ? (
        <p className="no-news">Belum ada berita.</p>
      ) : (
        <table className="tabel-berita">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Isi</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {beritaList.map((berita) => (
              <tr key={berita._id}>
                <td>
                  {berita.gambar && (
                    <img
                      src={berita.gambar}  // <-- gunakan URL penuh dari UploadThing
                      alt={berita.judul}
                      className="gambar-berita"
                      style={{ maxWidth: '150px', maxHeight: '100px', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>{berita.judul}</td>
                <td>
                  <div
                    className="ringkasan-isi"
                    dangerouslySetInnerHTML={{
                      __html:
                        berita.isi.length > 150
                          ? berita.isi.slice(0, 150) + '...'
                          : berita.isi,
                    }}
                  />
                </td>
                <td>{berita.kategori}</td>
                <td>
                  <div className="btn-aksi">
                    <Link to={`/admin/edit-berita/${berita._id}`} className="btn-edit">
                      <button className="txt-edit">Edit</button>
                    </Link>
                    <button onClick={() => deleteBerita(berita._id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BeritaPage;
