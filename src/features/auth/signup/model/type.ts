export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  verificationCode: string;
}

export type NicknameRequest = Pick<SignUpRequest, 'nickname'>;
export type EmailRequest = Pick<SignUpRequest, 'email'>;
export type VerifyCodeRequest = Pick<SignUpRequest, 'email' | 'verificationCode'>;
