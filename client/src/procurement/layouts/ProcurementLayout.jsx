import React, { useState } from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { 
  LayoutDashboard, Package, Bell, LogOut, Menu, X, ChevronDown, FileText, CheckCircle, MapPin
} from 'lucide-react';

const ProcurementLayout = () => {
  const { role, isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role.toLowerCase() !== 'procurement') return <Navigate to="/unauthorized" replace />;

  return (
    <div className="flex h-screen bg-bg-body font-sans text-text-main">
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden shadow-sm`}>
        <div className="overflow-y-auto overflow-x-hidden">
          <div className="h-20 flex items-center px-5 border-b border-gray-100">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold tracking-tight text-primary-blue leading-tight">VendorBridge</h2>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Procurement Officer</p>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-primary-blue absolute right-4">
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-1.5 text-sm font-medium">
            <NavLink
              to="/procurement"
              end
              className={({ isActive }) =>
                `flex items-center space-x-4 px-3 py-3 rounded-xl transition-colors whitespace-nowrap ${isActive ? 'bg-primary-blue text-white shadow-md' : 'text-text-muted hover:bg-gray-50 hover:text-primary-blue'}`
              }
            >
              <LayoutDashboard size={20} className="flex-shrink-0 ml-0.5" />
              <span>Dashboard</span>
            </NavLink>

            <button
              onClick={() => navigate('/procurement/rfq/create')}
              className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap w-full text-left"
            >
              <Package size={20} className="flex-shrink-0 ml-0.5" />
              <span>Create RFQ</span>
            </button>

            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <FileText size={20} className="flex-shrink-0 ml-0.5" />
              <span>All RFQs</span>
            </a>

            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <CheckCircle size={20} className="flex-shrink-0 ml-0.5" />
              <span>Quotations</span>
            </a>

            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <MapPin size={20} className="flex-shrink-0 ml-0.5" />
              <span>Purchase Orders</span>
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          {user && (
            <div className="flex items-center space-x-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-sm">
                {user.first_name?.[0]?.toUpperCase() || 'P'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{user.first_name} {user.last_name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button onClick={logout} className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-semibold w-full">
            <LogOut size={20} className="flex-shrink-0 ml-0.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-100 h-20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-gray-500 hover:text-primary-blue transition-colors bg-gray-50 p-2.5 rounded-xl border border-gray-100 shadow-sm">
            <Menu size={20} />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-gray-800">Procurement Officer Panel</h1>
          </div>
          <div className="flex items-center space-x-5 ml-auto">
            <div className="relative cursor-pointer group">
              <Bell size={22} className="text-gray-400 group-hover:text-primary-blue transition-colors" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProcurementLayout;
