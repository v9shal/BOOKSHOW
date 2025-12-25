import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return !user ? <Outlet /> : <Navigate to="/" replace />;
};