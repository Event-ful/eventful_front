import { instance } from '@/shared/api/instance';
import { NicknameRequest, EmailRequest, VerifyCodeRequest, SignUpRequest } from '../domain/type';

// 닉네임 중복 검사
export const checkNicknameApi = async (data: NicknameRequest) => {
  const res = await instance.post('/api/members/signup/check-nickname', data);
  return res.data;
};

// 이메일 인증 요청
export const sendEmailVerificationApi = async (data: EmailRequest) => {
  const res = await instance.post('/api/members/signup/verify-email', data);
  return res.data;
};

// 이메일 인증 코드 확인
export const verifyEmailCodeApi = async (data: VerifyCodeRequest) => {
  const res = await instance.post('/api/members/signup/verify-email/confirm', data);
  return res.data;
};

// 회원가입
export const signUpApi = async (data: SignUpRequest) => {
  const res = await instance.post('/api/members/signup', data);
  return res.data;
};
