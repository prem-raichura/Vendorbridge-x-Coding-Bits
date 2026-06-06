import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, UploadCloud, Plus, LayoutDashboard, FileText, Bell, ChevronDown, CheckCircle, MapPin, LogOut, Menu, Package } from 'lucide-react';

export const CreateRFQ = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(true);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
    }
  };
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    deadline: '',
    description: ''
  });

  // Items State
  const [items, setItems] = useState([
    { id: 1, name: '', qty: '', unit: '' }
  ]);

  // Vendors State
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Item Handlers
  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', qty: '', unit: '' }]);
  };
  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Vendor Handlers
  const addVendor = (e) => {
    if (e.key === 'Enter' && newVendor.trim()) {
      e.preventDefault();
      setVendors([...vendors, newVendor.trim()]);
      setNewVendor('');
    }
  };
  const removeVendor = (index) => {
    setVendors(vendors.filter((_, i) => i !== index));
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

      {/* Sidebar - Procurement Officer Panel (Light Theme) */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-sidebar-bg border-r border-gray-200 flex flex-col justify-between transition-all duration-300 lg:relative ${isSidebarExpanded ? 'w-64' : 'w-20'} ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'} overflow-hidden shadow-sm`}>
        <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
          
          <div className="h-20 flex items-center px-5 border-b border-gray-100 whitespace-nowrap">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center shadow-md ml-0.5">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div className={`transition-opacity duration-300 ml-4 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-lg font-bold tracking-tight text-primary-blue leading-tight">VendorBridge</h2>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Procurement Officer Panel</p>
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

            {/* RFQ Management - Expanded */}
            <div className="bg-primary-blue text-white rounded-xl shadow-md whitespace-nowrap overflow-hidden">
              <div className="flex items-center justify-between px-3 py-3 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <Package size={20} className="flex-shrink-0 ml-0.5" />
                  <span className={`transition-opacity duration-300 font-semibold ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>RFQ Management</span>
                </div>
                <ChevronDown size={16} className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <div className={`pb-3 pl-12 space-y-3 text-xs font-semibold transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <a href="#" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span>All RFQs</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-white transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></div>
                  <span>Create RFQ</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span>Closed RFQs</span>
                </a>
              </div>
            </div>

            {/* Quotation Management */}
            <div className="bg-transparent whitespace-nowrap overflow-hidden">
              <div className="flex items-center justify-between px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <Package size={20} className="flex-shrink-0 ml-0.5" />
                  <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Quotation Management</span>
                </div>
                <ChevronDown size={16} className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </div>

            {/* Approval Tracking */}
            <div className="bg-transparent whitespace-nowrap overflow-hidden">
              <div className="flex items-center justify-between px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <CheckCircle size={20} className="flex-shrink-0 ml-0.5" />
                  <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Approval Tracking</span>
                </div>
                <ChevronDown size={16} className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </div>

            {/* Purchase Orders */}
            <div className="bg-transparent whitespace-nowrap overflow-hidden">
              <div className="flex items-center justify-between px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <MapPin size={20} className="flex-shrink-0 ml-0.5" />
                  <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Purchase Orders</span>
                </div>
                <ChevronDown size={16} className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </div>

            {/* Invoices */}
            <div className="bg-transparent whitespace-nowrap overflow-hidden">
              <div className="flex items-center justify-between px-3 py-3 rounded-xl text-text-muted hover:bg-gray-50 hover:text-primary-blue transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <FileText size={20} className="flex-shrink-0 ml-0.5" />
                  <span className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>Invoices</span>
                </div>
                <ChevronDown size={16} className={`transition-opacity duration-300 ${isSidebarExpanded || mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </div>

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
          </div>
          
          <div className="flex items-center space-x-5 pl-6">
            <div className="relative cursor-pointer group">
              <Bell size={22} className="text-gray-400 group-hover:text-primary-blue transition-colors" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer group border-l border-gray-200 pl-5">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold text-gray-800 leading-none">Procurement Officer</span>
                <span className="text-[11px] font-semibold text-primary-blue mt-1">VendorBridge</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-sm shadow-md">
                P
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
            
            {/* Header Title */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight font-serif italic mb-2">Create RFQ's</h1>
              <p className="text-xl text-gray-600 font-serif italic">new request for quotation</p>
            </div>

            {/* Horizontal Stepper */}
            <div className="flex items-center justify-between w-full mb-16 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-300 -z-10"></div>
              
              <div className="bg-blue-100 border-2 border-primary-blue w-12 h-12 rounded-full flex items-center justify-center z-10 text-xl font-bold text-gray-800">1</div>
              <div className="bg-white border-2 border-gray-400 w-12 h-12 rounded-full flex items-center justify-center z-10 text-xl font-bold text-gray-800">2</div>
              <div className="bg-white border-2 border-gray-400 w-12 h-12 rounded-full flex items-center justify-center z-10 text-xl font-bold text-gray-800">3</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* LEFT COLUMN: Basic Fields */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">RFQ's title*</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue shadow-sm" 
                    placeholder="Office Furniture procurement Q2" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
                  <input 
                    type="text" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue shadow-sm" 
                    placeholder="Furniture" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Deadline*</label>
                  <input 
                    type="text" 
                    name="deadline" 
                    value={formData.deadline} 
                    onChange={handleInputChange} 
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue shadow-sm" 
                    placeholder="15 June 2025" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows={4} 
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 px-4 focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue shadow-sm resize-none" 
                    placeholder="Ergonomic chairs and standing desks for 3rd floor" 
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Items & Vendors */}
              <div className="space-y-12">
                
                {/* Line Items */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Line items</label>
                  <div className="border border-gray-300 rounded-2xl overflow-hidden mb-4">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="py-3 px-4 font-semibold text-sm text-gray-800 w-1/2">item</th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-800">qty</th>
                          <th className="py-3 px-4 font-semibold text-sm text-gray-800">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100 last:border-0 group">
                            <td className="py-3 px-4">
                              <input type="text" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm" placeholder="Item name" />
                            </td>
                            <td className="py-3 px-4">
                              <input type="text" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm" placeholder="0" />
                            </td>
                            <td className="py-3 px-4 flex items-center justify-between">
                              <input type="text" value={item.unit} onChange={(e) => updateItem(item.id, 'unit', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm" placeholder="Unit" />
                              <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100">
                                <X size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button onClick={addItem} className="flex items-center space-x-2 px-5 py-2 border border-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                    <Plus size={16} />
                    <span>add line item</span>
                  </button>
                </div>

                {/* Assign Vendors */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 uppercase tracking-wide mb-2">ASSIGN VENDORS</label>
                  <div className="border border-gray-300 rounded-2xl overflow-hidden flex flex-col">
                    <div className="divide-y divide-gray-200">
                      {vendors.map((vendor, idx) => (
                        <div key={idx} className="flex justify-between items-center px-4 py-3 bg-white">
                          <span className="text-sm text-gray-800">{vendor}</span>
                          <button onClick={() => removeVendor(idx)} className="text-gray-800 hover:text-red-500 font-bold">
                            <X size={16} strokeWidth={3} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-300 px-4 py-3 bg-white flex items-center">
                      <span className="text-gray-800 font-bold mr-2">+</span>
                      <input 
                        type="text" 
                        value={newVendor}
                        onChange={(e) => setNewVendor(e.target.value)}
                        onKeyDown={addVendor}
                        placeholder="add vendor" 
                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* BOTTOM SECTION: Buttons & Attachments */}
            <div className="mt-16 pt-10 border-t border-gray-300 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex flex-col space-y-4 justify-center">
                <button className="px-8 py-3 border-2 border-gray-800 rounded-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors w-fit shadow-sm">
                  Save & Send to Vendors
                </button>
                <button className="px-8 py-3 border-2 border-gray-800 rounded-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors w-fit shadow-sm">
                  Save as Draft
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Attachments</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-gray-800 rounded-2xl p-12 flex items-center justify-center text-center hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-800">Drag & drop files or click to upload</span>
                  <input type="file" ref={fileInputRef} className="hidden" multiple />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateRFQ;
