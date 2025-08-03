import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { User, AuthenticatedUser, AppError } from '../types/models';
import { apiService } from '../api/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Nullable<T> = T | null;

interface AuthContextType {
  user: AuthenticatedUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  authError: Nullable<string>;
  loading: boolean;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<Nullable<string>>(null);
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage<AuthenticatedUser | null>('healthViewUser', null);

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
    setInitialized(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const { data, error } = await apiService.login(email, password);
      
      if (error || !data) {
        throw new AppError(error || 'Authentication failed', 'AUTH_ERROR');
      }
      
      const userData: AuthenticatedUser = { 
        ...data, 
        lastLogin: new Date().toISOString()
      };
      
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
    initialized
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