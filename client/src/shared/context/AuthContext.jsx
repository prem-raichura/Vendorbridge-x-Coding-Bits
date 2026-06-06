import React, { createContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('vendorbridge_token');
    const storedRole = localStorage.getItem('vendorbridge_role');

    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem('vendorbridge_token', token);
    localStorage.setItem('vendorbridge_role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('vendorbridge_token');
    localStorage.removeItem('vendorbridge_role');
    setIsAuthenticated(false);
    setRole(null);
  };

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
