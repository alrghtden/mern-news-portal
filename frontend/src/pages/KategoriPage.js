import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/LandingPage.css';
import BeritaCard from '../components/BeritaCard';

const KategoriPage = ({ searchQuery }) => {
  const { kategori } = useParams();
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    fetch(`${process.env.RAILWAY_URL}/api/berita`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.kategori.toLowerCase() === kategori.toLowerCase()
        );
        setBerita(filtered);
      })
      .catch((err) => console.error('Gagal mengambil berita:', err));
  }, [kategori]);

  const filteredNews = berita.filter((item) =>
    item?.judul?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="content">
      <section className="latest-news">
        <h2>{searchQuery ? `Hasil Pencarian di ${kategori}` : `Berita ${kategori}`}</h2>
        <div className={'news-flex'}>
          {filteredNews.map((item) => (
            <BeritaCard key={item._id} berita={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default KategoriPage;
