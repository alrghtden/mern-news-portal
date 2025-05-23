import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import Logo from "../components/assets/logo_white.svg"; 

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
            <Link to="/">
                <img src={Logo} alt="Portal Berita" className="footer-logo"/>
            </Link>
          <p className="footer-description">
            Portal berita terkini yang menyajikan informasi cepat, akurat, dan terpercaya.
          </p>
        </div>

        <div className="footer-right">
          <ul className="footer-links">
            <li><Link to="/kategori/ekonomi">Ekonomi</Link></li>
            <li><Link to="/kategori/politik">Politik</Link></li>
            <li><Link to="/kategori/teknologi">Teknologi</Link></li>
            <li><Link to="/kategori/olahraga">Olahraga</Link></li>
            <li><Link to="/kategori/hiburan">Hiburan</Link></li>
          </ul>

          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Porta. All Rights Reserved. <br/>
            Porta tidak bertanggung jawab atas konten situs eksternal.
          </p>
        </div>
      </div>
    </footer>
  );
};
