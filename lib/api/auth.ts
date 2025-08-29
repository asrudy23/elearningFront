import apiClient from './axios';
import { LoginCredentials, LoginResponse } from '../../app/types/auth';
import { User } from '../../app/types/user';


/**
 * Appelle le endpoint de connexion de l'API.
 */
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

/**
 * Appelle le endpoint de déconnexion pour invalider le cookie côté serveur.
 */
export const logoutUser = async (): Promise<string> => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/me');
  return response.data;
};