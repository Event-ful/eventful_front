import { instance } from '@/shared/api/instance';
import { LoginRequest } from '../model/type';

export const loginApi = async (data: LoginRequest) => {
  const res = await instance.post('/api/auth/login', data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await instance.post('/api/auth/logout');
  return res.data;
};
