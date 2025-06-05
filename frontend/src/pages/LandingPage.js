import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import BeritaCard from '../components/BeritaCard';

const LandingPage = ({ searchQuery }) => {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_RAILWAY_URL}/api/berita`)
      .then((res) => res.json())
      .then((data) => setBerita(data))
      .catch((err) => console.error('Gagal mengambil berita:', err));
  }, []);

  const filteredNews = berita.filter((item) =>
    item?.judul?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showHeadline = !searchQuery && berita.length > 0;
  const listNews = showHeadline
    ? filteredNews.filter((item) => item._id !== berita[0]?._id)
    : filteredNews;

  return (
    <main className="content">
      {showHeadline && (
        <section className="headline-news">
          <h1>Berita Utama Hari Ini</h1>
          <Link to={/news/${berita[0]._id}} className="headline-link">
            <article>
              <img
                src={/uploads/${berita[0].gambar}}
                alt={berita[0].judul || 'Berita'}
              />
              <div className='title'>
                <h2>{berita[0].judul}</h2>
                <p>{berita[0].isi.substring(0, 100)}...</p>
              </div>
            </article>
          </Link>
        </section>
      )}

      <section className="latest-news">
        <h2>{searchQuery ? 'Hasil Pencarian' : 'Berita Terbaru'}</h2>
        <div className={'news-flex'}>
          {listNews.map((item) => (
            <BeritaCard key={item._id} berita={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;