import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login.jsx';
import CustomerList from './pages/customerList.jsx';
import AddCustomer from './pages/addCustomer.jsx';
import UpdateCustomer from './pages/updateCustomer.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import OpportunitiesList from './pages/opportunitiesList.jsx';
import AddOpportunity from './pages/addOpportunity.jsx';
import UpdateOpportunity from './pages/updateOpportunity.jsx';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <PrivateRoute>
                <CustomerList />
              </PrivateRoute>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/customers" replace /> : <Login />}
        />
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
        <Route path="/opportunities" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <OpportunitiesList />
            </PrivateRoute>
          }
        />
        <Route path="/opportunities/new" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AddOpportunity />
            </PrivateRoute>
          }
        />
        <Route path="/opportunities/edit/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UpdateOpportunity />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
