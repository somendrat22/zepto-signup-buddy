import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum UserType {
  CONSUMER = 'CONSUMER',
  ZEPTO_APP_ADMIN = 'ZEPTO_APP_ADMIN',
  SYSTEM = 'SYSTEM',
  MAINT = 'MAINT',
  WAREHOUSE_ADMIN = 'WAREHOUSE_ADMIN',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER'
}

export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  userType: UserType;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });

  const login = (authToken: string, userData: User) => {
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};