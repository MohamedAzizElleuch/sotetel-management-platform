import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute Rendering');
  console.log('User:', user);
  console.log('Allowed Roles:', allowedRoles);

  if (!user) {
    console.log('No user found. Redirecting to login...');
    // Redirect based on allowed role
    const fallbackLogin =
      allowedRoles.includes('admin')
        ? '/auth/adminlogin'
        : allowedRoles.includes('technician')
        ? '/auth/technicianlogin'
        : '/auth/clientlogin';

    return <Navigate to={fallbackLogin} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log('User role is not allowed. Redirecting to root...');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
