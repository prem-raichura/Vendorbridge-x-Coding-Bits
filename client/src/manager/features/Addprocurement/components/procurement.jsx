import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  Bell,
  ChevronDown,
  Edit2,
  Eye,
  MoreVertical,
  LogOut,
  FileCheck,
  Activity,
  FileText,
  Settings,
  Menu,
  X,
  Building2,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockOfficers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@vb.com', dept: 'IT Procurement', rfqs: 32, login: '12 May 2026, 10:30 AM', status: 'Active' },
  { id: 2, name: 'Priya Mehta', email: 'priya.mehta@vb.com', dept: 'Operations', rfqs: 28, login: '12 May 2026, 09:15 AM', status: 'Active' },
  { id: 3, name: 'Amit Kumar', email: 'amit.kumar@vb.com', dept: 'Admin', rfqs: 18, login: '11 May 2026, 04:45 PM', status: 'Active' },
  { id: 4, name: 'Sneha Verma', email: 'sneha.verma@vb.com', dept: 'Purchase', rfqs: 22, login: '11 May 2026, 11:20 AM', status: 'Active' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@vb.com', dept: 'IT Procurement', rfqs: 9, login: '10 May 2026, 03:05 PM', status: 'Inactive' },
  { id: 6, name: 'Neha Joshi', email: 'neha.joshi@vb.com', dept: 'Operations', rfqs: 6, login: '09 May 2026, 01:20 PM', status: 'Inactive' },
];

export const Addprocurement = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(true);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
    }
  };

  return (
    <div className="flex h-screen bg-bg-body font-sans text-text-main">
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-sidebar-bg border-r border-gray-200 flex flex-col justify-between transition-all duration-300 lg:relative ${isSidebarExpanded ? 'w-64' : 'w-20'} ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'} overflow-hidden shadow-sm`}>
        <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="h-20 flex items-center px-5 border-b border-gray-100 whitespace-nowrap">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center shadow-md ml-0.5">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div className={`transition-opacity duration-300 ml-4 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-lg font-bold tracking-tight text-primary-blue leading-tight">VendorBridge</h2>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">ERP System</p>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-primary-blue absolute right-4">
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-1.5 text-sm font-medium">
            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <LayoutDashboard size={20} className="flex-shrink-0 ml-0.5" />
              <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Dashboard</span>
            </a>

            <div className="bg-primary-blue text-white rounded-xl shadow-md whitespace-nowrap overflow-hidden">
              <a href="#" className="flex items-center justify-between px-3 py-3">
                <div className="flex items-center space-x-4">
                  <Users size={20} className="flex-shrink-0 ml-0.5" />
                  <span className={`transition-opacity duration-300 font-semibold ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Procurement Officers</span>
                </div>
                <ChevronDown size={16} className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
              </a>
              <div className={`pb-3 pl-12 space-y-3 text-xs font-semibold transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <button onClick={() => navigate('/manager/officers')} className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors w-full text-left">
                  <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></div>
                  <span>All Officers</span>
                </button>
                <button onClick={() => navigate('/manager/officers/create')} className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors w-full text-left">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span>Add Officer</span>
                </button>
              </div>
            </div>

            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <CheckCircle2 size={20} className="flex-shrink-0 ml-0.5" />
              <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Approval Requests</span>
            </a>
            
            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <Activity size={20} className="flex-shrink-0 ml-0.5" />
              <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Workflow Monitoring</span>
            </a>

            <a href="#" className="flex items-center justify-between px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap overflow-hidden">
              <div className="flex items-center space-x-4">
                <Bell size={20} className="flex-shrink-0 ml-0.5" />
                <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Notifications</span>
              </div>
              <span className={`bg-primary-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>5</span>
            </a>

            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <FileText size={20} className="flex-shrink-0 ml-0.5" />
              <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Reports</span>
            </a>

            <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors whitespace-nowrap">
              <Settings size={20} className="flex-shrink-0 ml-0.5" />
              <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Profile Settings</span>
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-100 whitespace-nowrap overflow-hidden">
          <a href="#" className="flex items-center space-x-4 px-3 py-3 rounded-xl text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-semibold">
            <LogOut size={20} className="flex-shrink-0 ml-0.5" />
            <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 h-20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center flex-1 space-x-4">
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-primary-blue transition-colors bg-gray-50 p-2.5 rounded-xl border border-gray-100 shadow-sm">
              <Menu size={20} />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-11 pr-4 py-2 text-sm font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all bg-white"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-5 pl-6">
            <div className="relative cursor-pointer group">
              <Bell size={22} className="text-gray-400 group-hover:text-primary-blue transition-colors" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer group border-l border-gray-200 pl-5">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold text-gray-800 leading-none">Manager User</span>
                <span className="text-[11px] font-semibold text-primary-blue mt-1">VendorBridge</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-sm shadow-md">
                M
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-green tracking-tight m-0">Dashboard Overview</h1>
              <p className="text-sm text-text-muted mt-1">Welcome back! Here's a real-time summary of your system.</p>
            </div>
            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
              <Clock size={16} />
              <span>Academic Year 2024-25</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-primary-green">
                  <Users size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-1 rounded-md text-xs font-bold">
                  <TrendingUp size={14} />
                  <span>+8.2%</span>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Officers</p>
              <h3 className="text-3xl font-black text-gray-800 tracking-tight">25</h3>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-primary-green">
                  <CheckCircle2 size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-1 rounded-md text-xs font-bold">
                  <TrendingUp size={14} />
                  <span>+5.1%</span>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Active Accounts</p>
              <h3 className="text-3xl font-black text-gray-800 tracking-tight">21</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-primary-green">
                  <Activity size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-1 rounded-md text-xs font-bold">
                  <TrendingUp size={14} />
                  <span>+12.3%</span>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total RFQs</p>
              <h3 className="text-3xl font-black text-gray-800 tracking-tight">145</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="text-primary-green">
                  <Building2 size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center space-x-1 bg-gray-50 text-gray-500 px-2 py-1 rounded-md text-xs font-bold">
                  <span>Stable</span>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Departments</p>
              <h3 className="text-3xl font-black text-gray-800 tracking-tight">4</h3>
            </div>
          </div>

          {/* Action Header & Table Area */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-800">Procurement Officers Roster</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => navigate('/manager/officers/create')}
                  className="text-white bg-primary-blue hover:bg-blue-900 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 transition-all shadow-md"
                >
                  <span>+ Add Officer</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/80 text-gray-500 font-bold tracking-wider uppercase text-[10px] border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Officer Name</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4 text-center">RFQs</th>
                    <th className="px-6 py-4">Last Login</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                  {mockOfficers.map((officer) => (
                    <tr key={officer.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 text-gray-400 font-bold">{officer.id}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{officer.name}</td>
                      <td className="px-6 py-4 text-gray-500">{officer.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-primary-blue px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">{officer.dept}</span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold">{officer.rfqs}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{officer.login}</td>
                      <td className="px-6 py-4">
                        {officer.status === 'Active' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-primary-green border border-green-100">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-500 border border-red-100">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-gray-400 hover:text-primary-blue p-1.5 rounded-lg hover:bg-blue-50 transition-colors"><Edit2 size={16} /></button>
                          <button className="text-gray-400 hover:text-primary-blue p-1.5 rounded-lg hover:bg-blue-50 transition-colors"><Eye size={16} /></button>
                          <button className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"><MoreVertical size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4 bg-gray-50/50">
              <div className="font-medium text-xs text-gray-400 uppercase tracking-wider">
                Showing <span className="text-gray-700 font-bold">1-6</span> of <span className="text-gray-700 font-bold">25</span> entries
              </div>
              <div className="flex items-center space-x-1.5">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600">&lt;</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-blue text-white shadow-md font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:text-primary-blue hover:border-blue-200 transition-all font-semibold">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:text-primary-blue hover:border-blue-200 transition-all font-semibold">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600">&gt;</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
export default Addprocurement;
