import React, { useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, MapPin, Search, ChevronRight, ChevronLeft, User, Camera, Globe, FileText, Building2, FileCheck, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProcurementOfficer = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Procurement Officer',
    phone: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createManagerRequest = async (data) => {
    const response = await axios.post('http://localhost:8000/api/admin/manager', data);
    return response.data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Please fill out the required basic details first.');
      return;
    }

    const submissionData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: 'Officer@123', // Default password 
      role: 'manager',
      phone_no: formData.phone,
      country: formData.country,
      avatar: photoPreview 
    };
    
    toast.promise(
      createManagerRequest(submissionData),
      {
        loading: 'Creating officer account...',
        success: 'Officer created successfully!',
        error: (err) => err.response?.data?.message || err.message || 'Creation failed',
      }
    ).then(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: 'Procurement Officer',
        phone: '',
        country: ''
      });
      setPhotoPreview(null);
      setTimeout(() => navigate('/manager/officers'), 2000);
    }).catch((error) => {
      console.error('Creation error:', error);
    });
  };

  return (
    <div className="min-h-screen w-full bg-bg-body flex flex-col items-center justify-center p-4 font-sans text-text-main py-10">
      <Toaster position="top-right" />
      
      <div className="max-w-2xl w-full">
        {/* Header/Back button */}
        <div className="mb-8 flex items-center space-x-4">
          <button 
            onClick={() => navigate('/manager/officers')}
            className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-all text-gray-500 hover:text-primary-blue"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-primary-green tracking-tight">Create Procurement Officer</h1>
            <p className="text-sm text-text-muted mt-1">
              Add a new procurement officer to your team
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Photo Upload Section */}
              <div className="flex justify-center mb-8 relative">
                <div 
                  onClick={handlePhotoClick}
                  className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary-blue hover:bg-blue-50/50 transition-all overflow-hidden relative group"
                >
                  {photoPreview ? (
                    <>
                      <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={24} />
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera className="text-gray-400 group-hover:text-primary-blue mb-1" size={28} />
                      <span className="text-xs text-gray-500 font-medium group-hover:text-primary-blue">Photo</span>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* First Name */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue transition-all"
                    placeholder="First Name"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue transition-all"
                    placeholder="Last Name"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue transition-all"
                    placeholder="Email Address"
                    required
                  />
                </div>

                {/* Role (Static) */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value="Procurement Officer"
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm shadow-sm text-gray-500 font-semibold cursor-not-allowed"
                    readOnly
                  />
                </div>

                {/* Phone Number */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue transition-all"
                    placeholder="Phone Number"
                  />
                </div>

                {/* Country */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-gray-400 group-focus-within:text-primary-blue transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue transition-all"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="pt-8 flex justify-center">
                <button
                  type="submit"
                  className="group relative flex justify-center items-center rounded-xl border border-transparent bg-primary-blue py-3 px-12 text-sm font-semibold text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 transition-all shadow-md hover:shadow-lg w-full md:w-auto"
                >
                  <span>Create Officer</span>
                  <ChevronRight className="ml-2 h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProcurementOfficer;
