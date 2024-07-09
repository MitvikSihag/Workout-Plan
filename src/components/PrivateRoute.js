import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();

  return userLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
