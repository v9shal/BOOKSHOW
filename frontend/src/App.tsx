import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/authContext';
import { ProtectedRoute } from './components/ProtectedComponent';
import { PublicRoute } from './components/ProtectedComponent';
import Login from './pages/Login';
import Register  from './pages/Register'; 
import Dashboard  from './pages/Bookmark';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;