import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, BloodPressureData, User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error('API Error:', error.response.status, error.response.data);
        } else {
          console.error('API Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      // Simulate network delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock response - in real app this would be actual API call
      if (email && password.length >= 6) {
        return {
          data: {
            email,
            token: `mock-token-${Math.random().toString(36).substring(2)}`,
          },
        };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Login failed' };
    }
  }

  async getBloodPressureData(token: string): Promise<ApiResponse<BloodPressureData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate mock data
      const data: BloodPressureData = {
        blood_pressures: Array.from({ length: 20 }, () => 
          Math.floor(Math.random() * 60) + 80 // Random values between 80-140
        ),
      };
      
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Failed to fetch data' };
    }
  }
}

export const apiService = new ApiService();