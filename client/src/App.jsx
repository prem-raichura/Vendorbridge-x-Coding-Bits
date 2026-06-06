import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import Login from './shared/auth/Login';
import Loader from './shared/components/Loader';

// Lazy loading the layouts to improve initial load time
const AdminLayout = React.lazy(() => import('./admin/layouts/AdminLayout'));
const VendorLayout = React.lazy(() => import('./vendor/layouts/VendorLayout'));
const ProcurementLayout = React.lazy(() => import('./procurement/layouts/ProcurementLayout'));

// Lazy loading the pages
const AdminDashboard = React.lazy(() => import('./admin/pages/AdminDashboard'));
const VendorDashboard = React.lazy(() => import('./vendor/pages/VendorDashboard'));
const ProcurementDashboard = React.lazy(() => import('./procurement/pages/ProcurementDashboard'));

const Unauthorized = () => <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}><h2>403 - Unauthorized</h2><p>You do not have permission to view this page.</p></div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>

            {/* Vendor Routes */}
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<VendorDashboard />} />
            </Route>

            {/* Procurement Routes */}
            <Route path="/procurement" element={<ProcurementLayout />}>
              <Route index element={<ProcurementDashboard />} />
            </Route>
            
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
