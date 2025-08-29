import { User } from "./user";

// Correspond au DTO LoginRequest
export interface LoginCredentials {
  email: string;
  password: string;
}

// Correspond au DTO LoginResponse
export interface LoginResponse {
  message: string;
  user: User;
}