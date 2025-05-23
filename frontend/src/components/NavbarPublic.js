import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './assets/logo_black.svg';
import '../styles/Navbar.css';

const NavbarPublic = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/"><img src={Logo} alt="Porta" /></NavLink>
      </div>

      <div className="nav-menu">
        <NavLink to="/kategori/ekonomi">Ekonomi</NavLink>
        <NavLink to="/kategori/politik">Politik</NavLink>
        <NavLink to="/kategori/teknologi">Teknologi</NavLink>
        <NavLink to="/kategori/olahraga">Olahraga</NavLink>
        <NavLink to="/kategori/hiburan">Hiburan</NavLink>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Cari berita..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="nav-login">
        {isLoggedIn ? (
          <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Akun
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/profil" onClick={() => setDropdownOpen(false)}><button>Profil Saya</button></NavLink>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login"><button>Login</button></NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavbarPublic;
