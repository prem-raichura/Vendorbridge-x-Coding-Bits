import { useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageOpen,
  UserCircle2,
  X,
} from 'lucide-react';
import { useAuth } from '../../shared/hooks/useAuth';
import './VendorLayout.css';

const VendorLayout = () => {
  const { role, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rfqMenuOpen, setRfqMenuOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isRfqRoute = location.pathname.startsWith('/vendor/rfqs');

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role.toLowerCase() !== 'vendor') return <Navigate to="/unauthorized" replace />;

  return (
    <div className="vendor-shell">
      {mobileMenuOpen && <div className="vendor-overlay" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`vendor-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="vendor-brandbar">
          <div className="vendor-brandmark">VB</div>
          <div className="vendor-brandcopy">
            <strong>VendorBridge</strong>
            <span>Vendor Panel</span>
          </div>
          <button className="vendor-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="vendor-nav" aria-label="Vendor navigation">
          <NavLink className={({ isActive }) => `vendor-nav-item ${isActive ? 'active' : ''}`} to="/vendor" end>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <button
            className={`vendor-nav-section ${isRfqRoute ? 'active' : ''}`}
            type="button"
            onClick={() => {
              setRfqMenuOpen(true);
              navigate('/vendor/rfqs/assigned');
            }}
          >
            <span className="vendor-nav-section-label">
              <PackageOpen size={18} />
              <span>RFQs</span>
            </span>
            <ChevronDown size={16} className={rfqMenuOpen ? 'chevron open' : 'chevron'} />
          </button>

          {rfqMenuOpen && (
            <div className="vendor-nav-subitems">
              <NavLink to="/vendor/rfqs/assigned" className={({ isActive }) => (isActive ? 'active' : '')}>
                Assigned RFQs
              </NavLink>
            </div>
          )}

          <NavLink className={({ isActive }) => `vendor-nav-item ${isActive ? 'active' : ''}`} to="/vendor">
            <UserCircle2 size={18} />
            <span>Profile</span>
          </NavLink>
        </nav>

        <button className="vendor-logout" onClick={logout} type="button">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="vendor-main">
        <header className="vendor-header">
          <button className="vendor-menu" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>

          <div className="vendor-search">
            <input type="text" placeholder="Search RFQs, quotations, POs..." />
          </div>

          <div className="vendor-profile">
            <div className="vendor-bell">
              <Bell size={20} />
              <span />
            </div>
            <div className="vendor-profile-text">
              <strong>Acme Supplies Pvt. Ltd.</strong>
              <span>Vendor</span>
            </div>
            <div className="vendor-avatar">AU</div>
          </div>
        </header>

        <section className="vendor-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default VendorLayout;
