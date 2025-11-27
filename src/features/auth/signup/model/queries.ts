import { useMutation } from '@tanstack/react-query';
import { checkNicknameApi, sendEmailVerificationApi, verifyEmailCodeApi, signUpApi } from '../api';
import { NicknameRequest, EmailRequest, VerifyCodeRequest, SignUpRequest } from './type';

export const useCheckNickname = () =>
  useMutation({
    mutationFn: (data: NicknameRequest) => checkNicknameApi(data),
  });

export const useSendEmailVerification = () =>
  useMutation({
    mutationFn: (data: EmailRequest) => sendEmailVerificationApi(data),
  });

export const useVerifyEmailCode = () =>
  useMutation({
    mutationFn: (data: VerifyCodeRequest) => verifyEmailCodeApi(data),
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: (data: SignUpRequest) => signUpApi(data),
  });
