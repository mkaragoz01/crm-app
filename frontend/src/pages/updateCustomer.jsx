import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../components/navbar.jsx';

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', notes: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setForm(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage('Güncelleme başarılı!');
      setTimeout(() => navigate("/customers"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
     <div style={{ padding: 20 }}>
        <Navbar />
      <h2>Müşteri Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" value={form.email} onChange={handleChange} required /><br /><br />
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required /><br /><br />
        <input type="text" name="company" value={form.company} onChange={handleChange} /><br /><br />
        <textarea type="text" name="notes" value={form.notes} onChange={handleChange} rows="3" /><br /><br />
        <button type="submit">Güncelle</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateCustomer;
