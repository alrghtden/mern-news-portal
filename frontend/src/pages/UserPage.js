import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Page.css';

const UserPage = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`);
      setUserList(response.data);
    } catch (error) {
      console.error('Gagal mengambil data user:', error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Yakin ingin menghapus user ini?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Gagal menghapus user:', error);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="tambah-berita">
        <h2>Daftar User</h2>
        <Link to="/admin/add-user">+ Tambah User</Link>
      </div>

      {userList.length === 0 ? (
        <p className="no-news">Belum ada user.</p>
      ) : (
        <table className="tabel-berita">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.foto && <img src={`/uploads/${user.foto}`} alt={user.nama} className="gambar-berita" />}
                </td>
                <td>{user.nama}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="btn-aksi"> 
                      <Link to={`/admin/edit-user/${user._id}`} className='btn-edit'>
                        <button className='txt-edit'>Edit</button>
                      </Link>
                    <button onClick={() => deleteUser(user._id)} className="btn-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPage;
