import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProfilUserPage.css';

const ProfilUserPage = () => {
  const [userProfile, setUserProfile] = useState({
    nama: '',
    email: '',
    foto: '',
  });

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    foto: null,
  });

  const [previewFoto, setPreviewFoto] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_RAILWAY_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('Data user dari API:', res.data);
        const { _id, nama, email, foto } = res.data;
        setUserId(_id);
        setUserProfile({ nama, email, foto });
        setFormData({ nama, email, password: '', foto: null });
        setPreviewFoto(foto ? `/uploads/${foto}` : '');
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil data user:', err);
        setIsLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewFoto(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('nama', formData.nama);
    form.append('email', formData.email);
    if (formData.password) form.append('password', formData.password);
    if (formData.foto) form.append('foto', formData.foto);

    try {
      await axios.put(`${process.env.REACT_APP_RAILWAY_URL}/api/user/${userId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const res = await axios.get(`${process.env.REACT_APP_RAILWAY_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { nama, email, foto } = res.data;
      setUserProfile({ nama, email, foto });
      setFormData({ nama, email, password: '', foto: null });
      setPreviewFoto(foto ? `/uploads/${foto}` : '');

      setMessage('Profil berhasil diperbarui');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setMessage('Gagal memperbarui profil');
    }
  };

  return (
    <div className="profil-user-page">
      <h2 className="profil-user-title">Profil Saya</h2>

      {isLoading ? (
        <p>Memuat data...</p>
      ) : (
        <>
          <div className="profil-user-info">
            <img
              src={previewFoto || '/default_profpic.png'}
              alt="Foto Profil"
              className="profil-user-foto"
            />
            <p><strong>Nama:</strong> {userProfile.nama}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Batal Edit' : 'Edit Profil'}
            </button>
          </div>

          {isEditing && (
            <>
              <h3 className="profil-user-subtitle">Edit Profil</h3>
              <form onSubmit={handleSubmit} className="profil-user-form" encType="multipart/form-data">
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Nama"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password baru (opsional)"
                />
                <input
                  type="file"
                  name="foto"
                  onChange={handleChange}
                  accept="image/*"
                />
                <button type="submit">Simpan Perubahan</button>
              </form>
            </>
          )}
          {message && <p className="profil-user-message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default ProfilUserPage;
