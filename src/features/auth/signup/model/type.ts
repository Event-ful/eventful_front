export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  verificationCode: string;
}

export interface ApiResponseError {
  statusCode: number;
  errorMessage: string;
  divisionCode: string | null;
}

export type NicknameRequest = Pick<SignUpRequest, 'nickname'>;
export type EmailRequest = Pick<SignUpRequest, 'email'>;
export type VerifyCodeRequest = Pick<SignUpRequest, 'email' | 'verificationCode'>;
