import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login.jsx';
import CustomerList from './pages/customerList.jsx';
import AddCustomer from './pages/addCustomer.jsx';
import UpdateCustomer from './pages/updateCustomer.jsx';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customers" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/customers"
          element={isAuthenticated ? <CustomerList /> : <Navigate to="/login" />}
        />
        <Route
          path="/customers/new"
          element={isAuthenticated ? <AddCustomer /> : <Navigate to="/login" />}
        />
        <Route
          path="/customers/edit/:id"
          element={isAuthenticated ? <UpdateCustomer /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
