import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
      <Link to="/customers">Müşteriler</Link>
      <Link to="/customers/new">Yeni Müşteri</Link>
      <button onClick={handleLogout}>Çıkış</button>
    </nav>
  );
};

export default Navbar;
