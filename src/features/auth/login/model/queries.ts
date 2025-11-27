import { useMutation } from '@tanstack/react-query';
import { loginApi, logoutApi } from '../api';
import { LoginRequest } from './type';

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: () => {
      console.log('로그인 완료');
    },
    onError: (err: Error) => {
      console.error('로그인 에러:', err);
    },
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      console.log('로그아웃 완료');
    },
    onError: (err: Error) => {
      console.error('로그아웃 에러:', err);
    },
  });
