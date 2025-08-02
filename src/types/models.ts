export type Email = `${string}@${string}.${string}`;

export interface User {
  email: Email;
  token: string;
  lastLogin?: Date;
}

export interface BloodPressureReading {
  value: number;
  timestamp: Date;
  notes?: string;
}

export interface BloodPressureData {
  readings: BloodPressureReading[];
  average: number;
  min: number;
  max: number;
}

export type ApiResponse<T> = 
  | { data: T; error?: never }
  | { data?: never; error: string };

export type Nullable<T> = T | null;

// Utility types for API responses
export type AsyncData<T> = {
  data: Nullable<T>;
  loading: boolean;
  error: Nullable<string>;
};

// Enhanced error handling
export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}