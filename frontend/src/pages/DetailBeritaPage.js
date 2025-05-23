import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetailBeritaPage.css';

const DetailBeritaPage = () => {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [komentar, setKomentar] = useState([]);
  const [isiKomentar, setIsiKomentar] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [validationMessage, setValidationMessage] = useState('');

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const beritaRes = await fetch(`http://localhost:5000/api/berita/${id}`);
      const beritaData = await beritaRes.json();
      setBerita(beritaData);

      const komentarRes = await fetch(`http://localhost:5000/api/komentar/berita/${id}`);
      const komentarData = await komentarRes.json();
      setKomentar(komentarData);

      if (token) {
        const userRes = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
      }
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  const handleKomentarChange = (e) => {
    const text = e.target.value;
    setIsiKomentar(text);
    setCharCount(text.length);

    if (text.length > 500) {
      setValidationMessage(`Komentar maksimal 500 karakter. Saat ini: ${text.length} karakter.`);
    } else {
      setValidationMessage('');
    }
  };

  const handleKomentarSubmit = async (e) => {
    e.preventDefault();

    if (isiKomentar.length > 500) {
      setMessage('Komentar maksimal 500 karakter');
      return;
    }

    if (!isiKomentar.trim()) return;

    try {
      await axios.post(
        `http://localhost:5000/api/komentar`,
        { isi: isiKomentar, beritaId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Komentar berhasil dikirim');
      setIsiKomentar('');
      setCharCount(0);
      setValidationMessage('');
      fetchData();
    } catch (err) {
      console.error('Gagal mengirim komentar:', err);
      setMessage('Gagal mengirim komentar');
    }
  };

  const handleHapusKomentar = async (komentarId) => {
    if (!window.confirm('Yakin ingin menghapus komentar ini?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/komentar/${komentarId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Komentar berhasil dihapus');
      fetchData();
    } catch (err) {
      console.error('Gagal menghapus komentar:', err);
      setMessage('Gagal menghapus komentar');
    }
  };

  if (!berita) return <p>Loading...</p>;

  return (
    <main className="detail-content">
      <div className="detail-container">
        <h1 className="detail-title">{berita.judul}</h1>
        <img src={`/uploads/${berita.gambar}`} alt={berita.judul} className="detail-image" />
        <p className="detail-text">{berita.isi}</p>

        <Link to="/" className="back-link">← Kembali ke Beranda</Link>

        <hr />

        <section className="komentar-section">
          <h3>Komentar</h3>

          {komentar.length === 0 ? (
            <p>Belum ada komentar.</p>
          ) : (
            <ul className="komentar-list">
              {komentar.map((kom) => (
                <li key={kom._id} className="komentar-item">
                  <div className="komentar-header">
                    <img
                      src={kom.user?.foto ? `/uploads/${kom.user.foto}` : '/default-profile.png'}
                      alt={kom.user?.nama || 'Anonim'}
                      className="komentar-foto"
                    />
                    <div className="komentar-user-info">
                      <strong>{kom.user?.nama || 'Anonim'}</strong>
                      <span className="komentar-date">
                        {new Date(kom.createdAt).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {user && kom.user && user._id === kom.user._id && (
                      <button
                        className="btn-hapus-komentar"
                        onClick={() => handleHapusKomentar(kom._id)}
                        title="Hapus Komentar"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="komentar-isi">{kom.isi}</p>
                </li>
              ))}
            </ul>
          )}

          {user ? (
            <form onSubmit={handleKomentarSubmit} className="komentar-form">
              <textarea
                value={isiKomentar}
                onChange={handleKomentarChange}
                placeholder="Tulis komentar (maksimal 500 karakter)..."
                maxLength={600}
                required
              />
              <p style={{ fontSize: '0.9rem', marginBottom: '5px', color: charCount > 500 ? 'red' : 'inherit' }}>
                {charCount} / 500 karakter
              </p>
              {validationMessage && (
                <p className="komentar-warning">{validationMessage}</p>
              )}
              <button type="submit" disabled={charCount > 500}>
                Kirim Komentar
              </button>
              {message && <p className="komentar-message">{message}</p>}
            </form>
          ) : (
            <p className="komentar-warning">Silakan login untuk mengirim komentar.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default DetailBeritaPage;
