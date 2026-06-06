import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Admin Dashboard</h2>
      <div style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <p>Welcome to the global administration panel. Use the sidebar to manage users, settings, and view system metrics.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
