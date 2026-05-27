import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // If there's no token, redirect to login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Otherwise render the child routes (e.g. AdminLayout)
  return <Outlet />;
}
