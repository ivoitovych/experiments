import api from '@/services/api';
import { AUTH_TOKEN_KEY } from '@/constants';

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

export const login = async (email: string): Promise<void> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email });

  localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
  localStorage.setItem('user', JSON.stringify(data.user));
};

export const verify = async (token: string) => {
  return await api.get<AuthResponse>(`/auth/verify?token=${token}`);
};
