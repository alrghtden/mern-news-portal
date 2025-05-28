import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [jumlahBerita, setJumlahBerita] = useState(0);
  const [jumlahUser, setJumlahUser] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const beritaRes = await axios.get(`${process.env.REACT_APP_RAILWAY_URL}/api/berita`);
      setJumlahBerita(beritaRes.data.length);

      const userRes = await axios.get(`${process.env.REACT_APP_RAILWAY_URL}/api/user`);
      setJumlahUser(userRes.data.length);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="stats-grid">
        <Link to="/admin/berita" className="stat-card">
          <div className="stat-number">{jumlahBerita}</div>
          <div className="stat-label">Berita</div>
        </Link>
        <Link to="/admin/user" className="stat-card">
          <div className="stat-number">{jumlahUser}</div>
          <div className="stat-label">User</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
