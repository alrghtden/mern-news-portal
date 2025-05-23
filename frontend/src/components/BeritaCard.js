import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BeritaCard.css';

const BeritaCard = ({ berita }) => {
  return (
    <Link to={`/news/${berita._id}`} className="berita-card-link">
      <article className="berita-card">
        <img src={`/uploads/${berita.gambar}`} alt={berita.judul} />
        <h3>{berita.judul}</h3>
        <p>{berita.isi.substring(0, 80)}...</p>
      </article>
    </Link>
  );
};

export default BeritaCard;
