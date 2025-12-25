import { apiRequest, setAuthToken, removeAuthToken } from './api';
import { AuthResponse, User, UserRole } from '../types';

export const register = async (
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<AuthResponse> => {
  const response = await apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, role }),
  });
  setAuthToken(response.token);
  return response;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setAuthToken(response.token);
  return response;
};

export const getMe = async (): Promise<User> => {
  return apiRequest<User>('/auth/me');
};

export const logout = (): void => {
  removeAuthToken();
};
