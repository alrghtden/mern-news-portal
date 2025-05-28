import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Add.css';

const EditUser = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_RAILWAY_URL}/api/user/${id}`);
      const { nama, email, role } = res.data;
      setNama(nama);
      setEmail(email);
      setRole(role);
    } catch (err) {
      console.error('Gagal mengambil data user:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (foto) formData.append('foto', foto);

    try {
      await axios.put(`${process.env.REACT_APP_RAILWAY_URL}/api/user/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/admin/user');
    } catch (err) {
      console.error('Gagal mengupdate user:', err);
    }
  };

  return (
    <div className="tambah-container">
      <h2>Edit User</h2>
      <form className="tambah-form" onSubmit={handleSubmit}>
        <div>
          <label>Nama:</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password Baru (Opsional):</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Ganti Foto (Opsional):</label>
          <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />
        </div>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditUser;
