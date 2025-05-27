import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister ? `/api/auth/register` : `/api/auth/login`;

    try {
      const res = await fetch(`${process.env.RAILWAY_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Terjadi kesalahan.');
        return;
      }

      localStorage.setItem('token', data.token);

      const userRes = await fetch(`${process.env.RAILWAY_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      });

      const userData = await userRes.json();

      if (!userRes.ok) {
        alert('Gagal mendapatkan data user');
        return;
      }

      localStorage.setItem('userRole', userData.role);

      navigate(userData.role === 'admin' ? '/admin/dashboard' : '/');
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal terhubung ke server.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Daftar Akun Baru' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Alamat Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Kata Sandi"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isRegister ? 'Daftar' : 'Login'}</button>
      </form>
      <p>
        {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
        <span onClick={() => setIsRegister(!isRegister)} className="auth-toggle">
          {isRegister ? 'Login di sini' : 'Daftar sekarang'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
