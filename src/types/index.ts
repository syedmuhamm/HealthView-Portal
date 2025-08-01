export interface User {
  email: string;
  token: string;
}

export interface BloodPressureData {
  blood_pressures: number[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}