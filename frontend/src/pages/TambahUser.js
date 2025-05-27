import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Add.css';

const TambahUser = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (foto) formData.append('foto', foto);

    try {
      await axios.post(`${process.env.RAILWAY_URL}/api/user`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/admin/user');
    } catch (error) {
      console.error('Gagal menambahkan user:', error);
    }
  };

  return (
    <div className="tambah-container">
      <h2>Tambah User</h2>
      <form className="tambah-form" onSubmit={handleSubmit}>
        <div>
          <label>Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Upload Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default TambahUser;
