import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateProcurementOfficer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Creating officer account...',
        success: <b>Officer created successfully!</b>,
        error: <b>Could not save.</b>,
      }
    ).then(() => {
      // Reset form after success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
      });
      // Optionally redirect back
      // navigate('/manager/officers');
    });
  };

  return (
    <div className="min-h-screen bg-bg-body flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-3xl w-full">
        {/* Header/Back button */}
        <div className="mb-8 flex items-center space-x-4">
          <button 
            onClick={() => navigate('/manager/officers')}
            className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-all text-gray-500 hover:text-primary-blue"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-primary-green tracking-tight">Add Procurement Officer</h1>
            <p className="text-sm text-text-muted mt-1">Create a new account for a procurement officer to manage RFQs.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center shadow-inner border border-blue-100">
              <UserPlus size={36} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 border border-gray-100 bg-gray-50/50 rounded-xl space-y-6 shadow-sm">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-sm text-gray-900 placeholder-gray-400" placeholder="John" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-sm text-gray-900 placeholder-gray-400" placeholder="Doe" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-sm text-gray-900 placeholder-gray-400" placeholder="john.doe@ksv.edu" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-sm text-gray-900 placeholder-gray-400" placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Department</label>
                <select name="department" value={formData.department} onChange={handleInputChange} className="block w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20 transition-all text-sm text-gray-900" required>
                  <option value="" disabled>Select Department</option>
                  <option value="IT Procurement">IT Procurement</option>
                  <option value="Operations">Operations</option>
                  <option value="Admin">Admin</option>
                  <option value="Purchase">Purchase</option>
                </select>
              </div>

            </div>

            <div className="flex justify-center pt-6">
              <button type="submit" className="w-full md:w-2/3 py-4 px-8 rounded-xl shadow-md text-base font-semibold text-white bg-primary-blue hover:bg-blue-900 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue transition-all duration-200">
                Create Officer Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateProcurementOfficer;
