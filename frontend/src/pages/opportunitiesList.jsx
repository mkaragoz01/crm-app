import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar.jsx';


const OpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/opportunities";

 

  const fetchOpportunities = useCallback(async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Fırsatlar yüklenemedi");
      }

      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities, token]);
  
  const deleteOpportunity = async (id) => {
    if (!window.confirm("Bu fırsatı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Silme başarısız");
      }

      setOpportunities(opportunities.filter((op) => op._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const editOpportunity = (id) => navigate(`/opportunities/edit/${id}`);

  if (loading) return <p>Yükleniyor...</p>;

  return (
     <div style={{ padding: 20 }}>
        <Navbar />
      <h1>Fırsatlar</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Durum</th>
            <th>Değer</th>
            <th>Müşteri</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.length > 0 ? (
            opportunities.map((op) => (
              <tr key={op._id}>
                <td>{op.title}</td>
                <td>{op.status}</td>
                <td>{op.value}</td>
                <td>{op.customer?.name || "Bilinmiyor"}</td>
                <td>
                  <button onClick={() => editOpportunity(op._id)}>Düzenle</button>
                  <button onClick={() => deleteOpportunity(op._id)}>Sil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Henüz fırsat eklenmemiş.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunitiesList;
