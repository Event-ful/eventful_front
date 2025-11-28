import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCheckNickname,
  useSendEmailVerification,
  useSignUp,
  useVerifyEmailCode,
} from './queries';
import { ApiResponseError } from '@/shared/api/type';

/**
 * 회원가입 폼 데이터 타입
 */
export interface SignUpFormData {
  nickname: string;
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
}

/**
 * 회원가입 폼 상태 및 로직을 관리하는 훅
 *
 * @description
 * - React Hook Form을 통한 입력값 관리
 * - 닉네임 중복 확인
 * - 이메일 인증번호 발송 및 확인
 * - 비밀번호 유효성 검사 및 확인
 *
 * @returns {Object} SignUpForm 컴포넌트에서 사용하는 상태와 함수
 */
export function useSignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      verificationCode: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { mutateAsync: checkNickname } = useCheckNickname();
  const { mutateAsync: sendVerification } = useSendEmailVerification();
  const { mutateAsync: verifyCode } = useVerifyEmailCode();
  const { mutateAsync: signUp } = useSignUp();

  const nickname = watch('nickname');
  const email = watch('email');
  const verificationCode = watch('verificationCode');
  const password = watch('password');

  // 닉네임 상태
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean>(false);

  // 이메일 인증 상태
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);

  /**
   * 닉네임 변경 감지 및 중복검사 결과 초기화
   *
   * @description
   * 닉네임 입력값이 변경될 때마다 실행되며,
   * 이전에 수행한 중복검사 결과를 초기화합니다.
   */
  useEffect(() => {
    if (isNicknameChecked) {
      setIsNicknameChecked(false);
      setIsNicknameAvailable(false);
    }
  }, [nickname]);

  /**
   * 타이머 카운트다운
   *
   * @description
   * timer 값이 0보다 클 때 매초 1씩 감소시키며,
   * 0이 되면 isTimerExpired를 true로 설정합니다.
   */
  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsTimerExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  /**
   * 폼 제출 핸들러
   *
   * @description
   * 모든 유효성 검사를 통과한 후 폼이 제출될 때 실행됩니다.
   *
   * @param {SignUpFormData} data - 폼에 입력된 회원가입 데이터
   *
   * @example
   * ```typescript
   * // 제출 시 콘솔에 출력되는 데이터 형식
   * {
   *   nickname: "사용자123",
   *   email: "user@example.com",
   *   verificationCode: "123456",
   *   password: "Password123!",
   *   passwordConfirm: "Password123!"
   * }
   * ```
   */
  const onSubmit = (data: SignUpFormData) => {
    signUp(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err: unknown) => {
        const error = err as { response?: { data?: ApiResponseError } };
        const message = error.response?.data?.errorMessage || '회원가입 중 오류가 발생했습니다.';
        alert(message);
      },
    });
  };

  /**
   * 닉네임 중복 확인 버튼 클릭 핸들러
   *
   * @description
   * 사용자가 입력한 닉네임의 중복 여부를 확인합니다.
   * 중복이면 에러 메시지를 설정하고, 사용 가능하면 에러를 제거합니다.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleNicknameCheck = () => {
    checkNickname(
      { nickname },
      {
        onSuccess: () => {
          setIsNicknameChecked(true);
          setIsNicknameAvailable(true);
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: ApiResponseError } };
          const message =
            error.response?.data?.errorMessage || '닉네임 확인 중 오류가 발생했습니다.';
          setError('nickname', { message });
        },
      },
    );
  };

  /**
   * 이메일 인증번호 전송 버튼 클릭 핸들러
   *
   * @description
   * 사용자가 입력한 이메일로 인증번호를 전송하고,
   * 10초 타이머를 시작합니다.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleSendVerification = () => {
    sendVerification(
      { email },
      {
        onSuccess: () => {
          setIsSent(true);
          setTimer(600);
          setIsTimerExpired(false);
          setIsVerified(false);
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: ApiResponseError } };
          const message =
            error.response?.data?.errorMessage || '이메일 확인 중 오류가 발생했습니다.';
          setError('email', { message });
        },
      },
    );
  };

  /**
   * 이메일 인증번호 재전송 버튼 클릭 핸들러
   *
   * @description
   * 타이머를 초기화하고 새로운 인증번호를 전송합니다.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleResendVerification = () => {
    sendVerification(
      { email },
      {
        onSuccess: () => {
          setTimer(600);
          setIsTimerExpired(false);
          setIsVerified(false);
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: ApiResponseError } };
          const message =
            error.response?.data?.errorMessage || '이메일 인증번호 확인 중 오류가 발생했습니다.';
          setError('verificationCode', { message });
        },
      },
    );
  };

  /**
   * 인증번호 확인 버튼 클릭 핸들러
   *
   * @description
   * 사용자가 입력한 인증번호가 올바른지 확인합니다.
   * 타이머가 만료되었거나 인증번호가 틀리면 에러 메시지를 설정합니다.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleVerifyCode = () => {
    if (isTimerExpired) {
      setError('verificationCode', { message: '인증 시간이 만료되었습니다.' });
      return;
    }

    verifyCode(
      { email, verificationCode },
      {
        onSuccess: () => {
          setIsVerified(true);
        },
        onError: (err: unknown) => {
          const error = err as { response?: { data?: ApiResponseError } };
          const message = error.response?.data?.errorMessage || '인증 확인 중 오류가 발생했습니다.';
          setError('verificationCode', { message });
        },
      },
    );
  };
  /**
   * 입력 필드의 상태를 반환하는 함수
   *
   * @description
   * 각 입력 필드의 현재 상태(default, success, error)를 결정합니다.
   * 에러가 있으면 'error', 값이 없으면 'default',
   * 유효성 검사를 통과하면 'success'를 반환합니다.
   *
   * @param {keyof SignUpFormData} fieldName - 상태를 확인할 필드명
   * @returns {'default' | 'success' | 'error'} 입력 필드의 현재 상태
   */
  const getInputStatus = (fieldName: keyof SignUpFormData): 'default' | 'success' | 'error' => {
    if (errors[fieldName]) return 'error';
    const value = watch(fieldName);
    if (!value) return 'default';

    if (fieldName === 'nickname' && isNicknameChecked) {
      return isNicknameAvailable ? 'success' : 'error';
    }
    if (fieldName === 'email' && !errors.email && email) return 'success';
    if (fieldName === 'verificationCode' && isVerified) return 'success';
    if (fieldName === 'password' && !errors.password && password) return 'success';
    if (fieldName === 'passwordConfirm' && !errors.passwordConfirm && watch('passwordConfirm'))
      return 'success';

    return 'default';
  };

  /**
   * 폼 전체의 유효성 검사 완료 여부
   */
  const isFormComplete = isValid && isNicknameChecked && isNicknameAvailable && isVerified;

  return {
    register,
    handleSubmit,
    watch,
    errors,
    getInputStatus,
    isFormComplete,
    isNicknameChecked,
    isNicknameAvailable,
    isSent,
    isVerified,
    timer,
    isTimerExpired,
    handleNicknameCheck,
    handleSendVerification,
    handleResendVerification,
    handleVerifyCode,
    onSubmit,
  };
}
