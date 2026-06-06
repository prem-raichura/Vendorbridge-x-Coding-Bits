import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const ProcurementLayout = () => {
  const { role, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role.toLowerCase() !== 'procurement') return <Navigate to="/unauthorized" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '250px', background: '#f5fff5', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #d4ebd4' }}>
        <h3 style={{ color: '#28a745' }}>Procurement</h3>
        <nav style={{ flex: 1, marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li><Link to="/procurement" style={{ textDecoration: 'none', color: '#28a745' }}>Dashboard</Link></li>
            <li><Link to="/procurement" style={{ textDecoration: 'none', color: '#28a745' }}>Create RFQ</Link></li>
            <li><Link to="/procurement" style={{ textDecoration: 'none', color: '#28a745' }}>Review Bids</Link></li>
          </ul>
        </nav>
        <button onClick={logout} style={{ marginTop: 'auto', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '40px', background: '#fcfffc' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProcurementLayout;
