import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import NavbarPublic from './components/NavbarPublic';
import NavbarAdmin from './components/NavbarAdmin';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BeritaPage from './pages/BeritaPage';
import TambahBerita from './pages/TambahBerita';
import EditBerita from './pages/EditBerita';
import UserPage from './pages/UserPage';
import TambahUser from './pages/TambahUser';
import EditUser from './pages/EditUser';
import KategoriPage from './pages/KategoriPage';
import DetailBeritaPage from './pages/DetailBeritaPage';
import AuthPage from './pages/AuthPage';
import ProfilUserPage from './pages/ProfilUserPage';

const AppContent = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? (
        <NavbarAdmin />
      ) : (
        <NavbarPublic searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      <div className="container">
        <Routes>
          <Route path="/" element={<LandingPage searchQuery={searchQuery} />} />
          <Route path="/kategori/:kategori" element={<KategoriPage searchQuery={searchQuery} />} />
          <Route path="/news/:id" element={<DetailBeritaPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/test" element={<Test />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profil" element={<ProfilUserPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/berita" element={<BeritaPage />} />
            <Route path="/admin/add-berita" element={<TambahBerita />} />
            <Route path="/admin/edit-berita/:id" element={<EditBerita />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/add-user" element={<TambahUser />} />
            <Route path="/admin/edit-user/:id" element={<EditUser />} />
          </Route>
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
