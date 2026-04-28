import { api } from '@/services/api';
import { API_ROUTES } from '@/constants/api-routes';

interface LoginResponse {
  message: string;
}

interface VerifyResponse {
  accessToken: string;
}

export const login = async (email: string): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(API_ROUTES.AUTH_LOGIN, { email });
  return data;
};

export const verify = async (token: string): Promise<VerifyResponse> => {
  const { data } = await api.get<VerifyResponse>(API_ROUTES.AUTH_VERIFY, {
    params: { token },
  });
  return data;
};
