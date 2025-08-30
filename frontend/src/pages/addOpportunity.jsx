import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar.jsx';

const AddOpportunity = () => {
  const [form, setForm] = useState({
    title: '',
    status: 'open',
    value: '',
    customerId: '',
  });
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Müşteri alınamadı');
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCustomers();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Hata oluştu');
      setMessage('Fırsat başarıyla eklendi');
      setForm({ title: '', status: '', value: '', customerId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
     <div style={{ padding: 20 }}>
        <Navbar />
      <h2>Yeni Fırsat Ekle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Başlık"
          value={form.title}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="number"
          name="value"
          placeholder="Değer"
          value={form.value}
          onChange={handleChange}
        /><br /><br />
        <label>Müşteri Seç:</label><br />
        <select
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
          required
        >
          <option value="">--Müşteri Seç--</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.email})
            </option>
          ))}
        </select><br /><br />
        <button type="submit">Ekle</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddOpportunity;
