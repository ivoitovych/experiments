import { api } from '@/services/api';
import type { UserResponse } from './user.types';
import { API_ROUTES } from '@/constants/api-routes';

export const getCurrentUser = async (): Promise<UserResponse> => {
  const { data } = await api.get(API_ROUTES.USERS_ME);
  return data;
};
