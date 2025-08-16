import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OpportunityEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    title: "",
    status: "open",
    value: "",
    customerId: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setForm({
          title: data.title,
          status: data.status,
          value: data.value,
          customerId: data.customer?._id || "",
        });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOpportunity();
  }, [id, token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Güncelleme başarılı!");
      setTimeout(() => navigate("/opportunities"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 20 }}>
      <h2>Fırsat Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Başlık"
            required
        /><br /><br />

        <select name="status" value={form.status} onChange={handleChange} required>
            <option value="open">Open</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
        </select><br /><br />

        <input
            type="number"
            name="value"
            value={form.value}
            onChange={handleChange}
            placeholder="Değer"
            required
        /><br /><br />

        <button type="submit">Güncelle</button>
        </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default OpportunityEdit;
