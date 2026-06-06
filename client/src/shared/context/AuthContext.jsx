import React, { createContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';

export const AuthContext = createContext();
const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
const USER_KEY = 'user';
const LEGACY_TOKEN_KEY = 'vendorbridge_token';
const LEGACY_ROLE_KEY = 'vendorbridge_role';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
    const storedRole = localStorage.getItem(ROLE_KEY) || localStorage.getItem(LEGACY_ROLE_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (token && storedRole) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(ROLE_KEY, storedRole);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      localStorage.removeItem(LEGACY_ROLE_KEY);
      setIsAuthenticated(true);
      setRole(storedRole);
      if (storedUser) {
        try { setUser(JSON.parse(storedUser)); } catch { setUser(null); }
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userRole, userData) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, userRole);
    if (userData) localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_ROLE_KEY);
    setIsAuthenticated(true);
    setRole(userRole);
    setUser(userData || null);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_ROLE_KEY);
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
  };

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
