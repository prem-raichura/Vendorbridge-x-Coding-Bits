import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import LandingPage from './shared/pages/LandingPage';
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
const RegisterVendor = () => (
  <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
    <div style={{ maxWidth: '520px', width: '100%', border: '1px solid #d9e4e8', borderRadius: '18px', padding: '2rem', background: '#fff', boxShadow: '0 24px 60px rgba(15, 23, 34, 0.08)' }}>
      <p style={{ margin: 0, color: '#0f8f77', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.78rem', fontWeight: 800 }}>Vendor registration</p>
      <h2 style={{ margin: '12px 0 8px', fontSize: '2rem', lineHeight: 1.1, color: '#0f1722' }}>Coming soon</h2>
      <p style={{ margin: 0, color: '#51626c', lineHeight: 1.6 }}>The registration flow is not wired yet. Use the login form for now, and we can add the vendor onboarding screen next.</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-vendor" element={<RegisterVendor />} />
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
