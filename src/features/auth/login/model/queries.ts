import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../api/index';
import { LoginRequest, LoginResponse } from './type';

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    },
  });
