import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useAuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  useAuth(); 

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; 
  }

  return children; 
};

export default ProtectedRoute;
