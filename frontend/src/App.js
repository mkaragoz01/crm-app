import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login.jsx';
import CustomerList from './pages/customerList.jsx';
import AddCustomer from './pages/addCustomer.jsx';
import UpdateCustomer from './pages/updateCustomer.jsx';
import PrivateRoute from './components/privateRoute.jsx';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/customers" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/customers"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CustomerList />
            </PrivateRoute>
          }
        />

        <Route
          path="/customers/new"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AddCustomer />
            </PrivateRoute>
          }
        />

        <Route
          path="/customers/edit/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UpdateCustomer />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
