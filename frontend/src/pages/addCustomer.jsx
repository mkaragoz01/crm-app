import React, { useState } from 'react';
import Navbar from '../components/navbar.jsx';


const AddCustomer = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Hata oluştu');

      setMessage('Müşteri başarıyla eklendi');
      setForm({ name: '', email: '', phone: '', company: '', notes: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
        <Navbar />
      <h2>Yeni Müşteri Ekle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="İsim"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="phone"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="company"
          placeholder="Firma"
          value={form.company}
          onChange={handleChange}
        /><br /><br />
        <textarea
          name="notes"
          placeholder="Notlar"
          value={form.notes}
          onChange={handleChange}
          rows="3"
        ></textarea><br /><br />
        <button type="submit">Ekle</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddCustomer;
