import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './assets/logo_black.svg';
import '../styles/Navbar.css';

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="navbar admin-navbar">
      <div className="nav-logo">
        <NavLink to="/admin/dashboard"><img src={Logo} alt="Porta" /></NavLink>
      </div>

      <div className="nav-menu-admin">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/berita">Berita</NavLink>
        <NavLink to="/admin/user">User</NavLink>
      </div>

      <div className="nav-login">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
