import apiClient from './axios';
import { CreateUserPayload } from '../../app/types/user';
import { User } from '../../app/types/user'; // Correspond à UserResponse

/**
 * Envoie une requête pour créer un nouvel utilisateur.
 * @param payload Les données du nouvel utilisateur.
 * @returns Les informations de l'utilisateur créé.
 */
export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  // Note: le endpoint est "api/users/createUser" et non "/api/users/createUser"
  // car notre baseURL dans axios.ts se termine déjà par "/api"
  const response = await apiClient.post<User>('/users/createUser', payload);
  return response.data;
};