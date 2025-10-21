import { instance } from '@/shared/api/instance';
import { LoginRequest, LoginResponse } from '../model/type';

export const loginApi = async (data: LoginRequest) => {
  const res = await instance.post<LoginResponse>('/api/auth/login', data);
  return res.data;
};
