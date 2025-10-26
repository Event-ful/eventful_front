import { useMutation } from '@tanstack/react-query';
import { loginApi, logoutApi } from '../api/index';
import { LoginRequest } from './type';

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: () => {
      console.log('로그인 완료');
    },
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      console.log('로그아웃 완료');
    },
  });
