import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, BloodPressureData, User, BloodPressureReading } from '../types/models';
import { AppError } from '../types/models';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Define the shape of error responses from your API
interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

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
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response) {
          const errorMessage = error.response.data?.message || error.message;
          throw new AppError(errorMessage, 'API_ERROR', error);
        } else {
          throw new AppError(error.message, 'NETWORK_ERROR', error);
        }
      }
    );
  }

  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate email format (simple version - consider using a library for production)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) || password.length < 6) {
        throw new AppError('Invalid credentials', 'AUTH_ERROR');
      }
      
      return {
        data: {
          email: email as `${string}@${string}.${string}`, // Type assertion
          token: `mock-token-${Math.random().toString(36).substring(2)}`,
        },
      };
    } catch (error) {
      return { 
        error: error instanceof AppError 
          ? error.message 
          : 'Login failed' 
      };
    }
  }

  async getBloodPressureData(token: string): Promise<ApiResponse<BloodPressureData>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate values between 60-180 to match slider range
      const readings: BloodPressureReading[] = Array.from({ length: 20 }, (_, i) => ({
        value: Math.floor(Math.random() * 120) + 60, // 60-180 range
        timestamp: new Date(Date.now() - i * 3600000),
      }));
      
      const values = readings.map(r => r.value);
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      
      return { 
        data: {
          readings,
          average,
          min: Math.min(...values),
          max: Math.max(...values),
        } 
      };
    } catch (error) {
      return { 
        error: error instanceof AppError 
          ? error.message 
          : 'Failed to fetch data' 
      };
    }
  }
}

export const apiService = new ApiService();