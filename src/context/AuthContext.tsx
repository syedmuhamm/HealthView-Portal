import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { User, AppError } from '../types/models';
import { apiService } from '../api/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Nullable<T> = T | null;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  authError: Nullable<string>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<Nullable<string>>(null);
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage<User | null>('user', null);

  // Initialize from storage
  useEffect(() => {
    if (storedUser && !user) {
      setUser(storedUser);
    }
  }, [storedUser, user]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { data, error } = await apiService.login(email, password);
      
      if (error || !data) {
        throw new AppError(error || 'Authentication failed', 'AUTH_ERROR');
      }
      
      const userData = { ...data, lastLogin: new Date() };
      setUser(userData);
      setStoredUser(userData);
    } catch (error) {
      const message = error instanceof AppError ? error.message : 'Login failed';
      setAuthError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setStoredUser]);

  const logout = useCallback(() => {
    setUser(null);
    removeStoredUser();
  }, [removeStoredUser]);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    authError,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};