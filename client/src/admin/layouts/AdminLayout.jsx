import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const AdminLayout = () => {
  const { role, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role.toLowerCase() !== 'admin') return <Navigate to="/unauthorized" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '250px', background: '#f4f4f4', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #ddd' }}>
        <h3>Admin Panel</h3>
        <nav style={{ flex: 1, marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li><Link to="/admin" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link></li>
            <li><Link to="/admin" style={{ textDecoration: 'none', color: '#333' }}>Manage Users</Link></li>
            <li><Link to="/admin" style={{ textDecoration: 'none', color: '#333' }}>System Settings</Link></li>
          </ul>
        </nav>
        <button onClick={logout} style={{ marginTop: 'auto', padding: '10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '40px', background: '#fafafa' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
