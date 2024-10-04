import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const PublicRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/admin" /> : <Component />;
};

export const  ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};
