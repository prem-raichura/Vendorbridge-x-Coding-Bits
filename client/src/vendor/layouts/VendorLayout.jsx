import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const VendorLayout = () => {
  const { role, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role.toLowerCase() !== 'vendor') return <Navigate to="/unauthorized" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '250px', background: '#eef6ff', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #cce0ff' }}>
        <h3 style={{ color: '#0056b3' }}>Vendor Portal</h3>
        <nav style={{ flex: 1, marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li><Link to="/vendor" style={{ textDecoration: 'none', color: '#0056b3' }}>Dashboard</Link></li>
            <li><Link to="/vendor" style={{ textDecoration: 'none', color: '#0056b3' }}>My Quotations</Link></li>
            <li><Link to="/vendor" style={{ textDecoration: 'none', color: '#0056b3' }}>Active RFQs</Link></li>
          </ul>
        </nav>
        <button onClick={logout} style={{ marginTop: 'auto', padding: '10px', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '40px', background: '#f8fbff' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
