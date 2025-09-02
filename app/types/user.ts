import { Hobby } from "./enums/hobby";
import { Role } from "./enums/role";

// Cette interface correspond maintenant exactement à votre DTO UserResponse
export interface User {
  id: number;          // Long devient number
  firstName: string;
  lastName: string;
  email: string;
  phone: string;       // Nouveau champ
  role: Role;          // Utilise notre type Role  
  isActive: boolean;   // Nouveau champ
}

// Elle correspond à votre DTO UserRequest côté backend.
export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: Role; // Utilise notre enum 'STUDENT' | 'TEACHER'
}