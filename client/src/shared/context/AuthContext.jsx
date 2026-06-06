import React, { createContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';

export const AuthContext = createContext();
const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const LEGACY_TOKEN_KEY = 'vendorbridge_token';
const LEGACY_ROLE_KEY = 'vendorbridge_role';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
    const storedRole = localStorage.getItem(ROLE_KEY) || localStorage.getItem(LEGACY_ROLE_KEY);

    if (token && storedRole) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(ROLE_KEY, storedRole);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      localStorage.removeItem(LEGACY_ROLE_KEY);
      setIsAuthenticated(true);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, userRole);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_ROLE_KEY);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_ROLE_KEY);
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
