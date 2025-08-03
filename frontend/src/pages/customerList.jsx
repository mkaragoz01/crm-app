import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar.jsx';
import{ useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/customers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Veri alınamadı');

      setCustomers(data);
    } catch (err) {
      setError(err.message);
    }
  };

const handleDelete = async (id) => {
  if (!window.confirm("Silmek istediğine emin misin?")) return;
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    setCustomers(customers.filter(c => c._id !== id));
  } catch (err) {
    alert(err.message);
  }
};

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
        <Navbar />
      <h2>Müşteri Listesi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
         {customers.map((c) => (
            <li key={c._id}>
              {c.name} - {c.email} - {c.phone}
              <button onClick={() => navigate(`/customers/edit/${c._id}`)}>Güncelle</button>
              <button onClick={() => handleDelete(c._id)}>Sil</button>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default CustomerList;
