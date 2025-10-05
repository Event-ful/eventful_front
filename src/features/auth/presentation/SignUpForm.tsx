import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Input } from '@/shared/ui/input';
import { Body4, Button2, Button3, Headline2, Title3 } from '@/shared/ui/typography';
import Clock from '@/assets/svg/clock.svg';
import CheckCircleBlue from '@/assets/svg/check_circle_blue.svg';
import CloseCircleRed from '@/assets/svg/close_circle_red.svg';
import { useNavigate } from 'react-router-dom';
import {
  useCheckNickname,
  useSendEmailVerification,
  useSignUp,
  useVerifyEmailCode,
} from '../data/hooks';

/**
 * 회원가입 폼 데이터 타입
 */
interface SignUpFormData {
  nickname: string;
  email: string;
  verificationCode: string;
  password: string;
  passwordConfirm: string;
}

/**
 * 회원가입 폼 컴포넌트
 *
 * @description
 * React Hook Form을 사용한 회원가입 폼입니다.
 * 닉네임 중복 확인, 이메일 인증, 비밀번호 유효성 검사 기능을 포함합니다.
 *
 * @features
 * - 닉네임 중복 확인
 * - 이메일 인증번호 발송 및 확인 (10초 타이머)
 * - 비밀번호 유효성 검사 (영문, 숫자, 특수문자 포함 8자리 이상)
 * - 비밀번호 확인 일치 검사
 * - 실시간 입력 유효성 검증
 *
 * @returns {JSX.Element} 회원가입 폼 UI
 */
export default function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    clearErrors,
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

  // 닉네임 중복 확인 상태
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  // 이메일 인증 상태
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerExpired, setIsTimerExpired] = useState(false);

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
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const res = await signUp(data);
      if (res.data === 'Success') {
        navigate('/home');
      }
    } catch (err) {
      const message = err.response?.data?.errorMessage || '회원가입 중 오류가 발생했습니다.';
      alert(message);
    }
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
  const handleNicknameCheck = async () => {
    try {
      const res = await checkNickname({ nickname });
      const result = res.data === 'Success';

      setIsNicknameChecked(true);
      setIsNicknameAvailable(result);

      if (!result) {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      } else {
        clearErrors('nickname');
      }
    } catch (err) {
      const message = err.response?.data?.errorMessage || '닉네임 확인 중 오류가 발생했습니다.';
      setError('nickname', { message });
    }
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
  const handleSendVerification = async () => {
    try {
      await sendVerification({ email });
      setIsSent(true);
      setTimer(600);
      setIsTimerExpired(false);
      setIsVerified(false);
    } catch (err) {
      const message = err.response?.data?.errorMessage || '이메일 확인 중 오류가 발생했습니다.';
      setError('email', { message });
    }
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
  const handleResendVerification = async () => {
    try {
      await sendVerification({ email });
      setTimer(600);
      setIsTimerExpired(false);
      setIsVerified(false);
    } catch (err) {
      const message =
        err.response?.data?.errorMessage || '이메일 인증번호 확인 중 오류가 발생했습니다.';
      setError('verificationCode', { message });
    }
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
  const handleVerifyCode = async () => {
    if (isTimerExpired) {
      setError('verificationCode', { message: '인증 시간이 만료되었습니다.' });
      return;
    }
    try {
      const res = await verifyCode({ email, verificationCode });
      const result = res.data === 'Success';

      setIsVerified(result);
      if (result) {
        setTimer(0);
        clearErrors('verificationCode');
      } else {
        setError('verificationCode', { message: '인증번호가 올바르지 않습니다.' });
      }
    } catch (err) {
      const message = err.response?.data?.errorMessage || '인증 확인 중 오류가 발생했습니다.';
      setError('verificationCode', { message });
    }
  };

  /**
   * 초를 MM:SS 형식으로 변환
   *
   * @param {number} seconds - 변환할 시간 (초 단위)
   * @returns {string} "MM:SS" 형식의 문자열
   */
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
    if (fieldName === 'email' && !errors.email && email) {
      return 'success';
    }
    if (fieldName === 'verificationCode' && isVerified) {
      return 'success';
    }
    if (fieldName === 'password' && !errors.password && password) {
      return 'success';
    }
    if (fieldName === 'passwordConfirm' && !errors.passwordConfirm && watch('passwordConfirm')) {
      return 'success';
    }

    return 'default';
  };

  /**
   * 상태에 따른 메시지 텍스트 색상을 반환하는 함수
   *
   * @description
   * 입력 필드의 상태에 따라 적절한 Tailwind CSS 색상 클래스를 반환합니다.
   *
   * @param {'default' | 'success' | 'error'} status - 입력 필드의 상태
   * @returns {string} Tailwind CSS 텍스트 색상 클래스
   */
  const getMessageColor = (status: 'default' | 'success' | 'error') => {
    if (status === 'error') return 'text-red-200';
    if (status === 'success') return 'text-blue-300';
    return 'text-black-300';
  };

  /**
   * 폼 전체의 유효성 검사 완료 여부
   */
  const isFormComplete = isValid && isNicknameChecked && isNicknameAvailable && isVerified;

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="h-[100%] bg-white-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white-50 p-8 rounded-xl border-[1px] border-black-200">
        <Headline2 className="text-black-400 text-center mb-8">회원가입</Headline2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 닉네임 */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Title3 className="text-black-400">닉네임</Title3>
              <span className="text-red-200">*</span>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  {...register('nickname', {
                    required: '닉네임을 입력하세요',
                  })}
                  value={watch('nickname') || ''}
                  placeholder="닉네임을 입력하세요"
                  type="text"
                  maxLength={10}
                  status={getInputStatus('nickname')}
                />
                <div
                  className={`absolute bottom-[4px] right-[6px] text-[12px] font-regular ${
                    (watch('nickname')?.length || 0) > 10 ? 'text-red-200' : 'text-black-300'
                  }`}
                >
                  {watch('nickname')?.length || 0} / 10
                </div>
              </div>

              {isNicknameChecked ? (
                <div className="h-[39px] flex items-center justify-center px-2">
                  {isNicknameAvailable ? (
                    <img src={CheckCircleBlue} alt="사용 가능한 닉네임" className="w-6 h-6" />
                  ) : (
                    <img src={CloseCircleRed} alt="사용 불가능한 닉네임" className="w-6 h-6" />
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleNicknameCheck}
                  disabled={!nickname.trim()}
                  className={`h-[39px] px-4 rounded whitespace-nowrap ${
                    !nickname.trim()
                      ? 'bg-black-300 text-white-50 cursor-not-allowed'
                      : 'bg-green-400 text-white-50 hover:bg-green-500'
                  }`}
                >
                  <Button3>중복검사</Button3>
                </button>
              )}
            </div>
            {isNicknameChecked && (
              <div className="mt-[4px]">
                <Body4 className={`ml-[2px] ${getMessageColor(getInputStatus('nickname'))}`}>
                  {isNicknameAvailable
                    ? '사용 가능한 닉네임 입니다.'
                    : '이미 사용 중인 닉네임 입니다.'}
                </Body4>
              </div>
            )}
            {errors.nickname && !isNicknameChecked && (
              <div className="mt-[4px]">
                <Body4 className={`ml-[2px] ${getMessageColor('error')}`}>
                  {errors.nickname.message}
                </Body4>
              </div>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Title3 className="text-black-400">이메일</Title3>
              <span className="text-red-200">*</span>
            </div>
            <div className="flex gap-2 mb-2">
              <Input
                {...register('email', {
                  required: '이메일을 입력하세요',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.(com|net|org|kr|co\.kr)$/i,
                    message: '올바른 이메일을 입력해주세요',
                  },
                })}
                placeholder="이메일을 입력하세요"
                className="flex-1"
                status={getInputStatus('email')}
              />
              {!isSent ? (
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={!!errors.email || !email}
                  className={`h-[39px] px-3 rounded whitespace-nowrap ${
                    !!errors.email || !email
                      ? 'bg-black-300 text-white-50 cursor-not-allowed'
                      : 'bg-green-400 text-white-50 hover:bg-green-500'
                  }`}
                >
                  <Button3>인증 번호 전송</Button3>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={!!errors.email || !email || (timer > 0 && !isTimerExpired)}
                  className={`h-[39px] px-3 rounded whitespace-nowrap ${
                    !!errors.email || !email || (timer > 0 && !isTimerExpired)
                      ? 'bg-black-300 text-white-50 cursor-not-allowed'
                      : 'bg-green-400 text-white-50 hover:bg-green-500'
                  }`}
                >
                  <Button3>재전송</Button3>
                </button>
              )}
            </div>
            {errors.email && (
              <div className="mt-[4px]">
                <Body4 className={`ml-[2px] ${getMessageColor('error')}`}>
                  {errors.email.message}
                </Body4>
              </div>
            )}

            {/* 인증번호 입력 */}
            {isSent && (
              <div className="mt-2">
                <div className="flex gap-2">
                  <Input
                    {...register('verificationCode')}
                    placeholder="인증번호를 입력하세요"
                    className="w-[250px]"
                    status={getInputStatus('verificationCode')}
                  />
                  {isVerified ? (
                    <div className="h-[39px] flex items-center justify-center px-2">
                      <img src={CheckCircleBlue} alt="인증 완료" className="w-6 h-6" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={!verificationCode}
                      className={`h-[39px] px-4 rounded whitespace-nowrap ${
                        !verificationCode
                          ? 'bg-black-300 text-white-50 cursor-not-allowed'
                          : 'bg-green-400 text-white-50 hover:bg-green-500'
                      }`}
                    >
                      <Button3>인증하기</Button3>
                    </button>
                  )}
                  {!isVerified && (
                    <div className="flex item-center m-auto w-[55px]">
                      <img src={Clock} alt="타이머 시계" className="w-4 h-4 mr-1" />
                      <Body4 className="text-black-300">{formatTime(timer)}</Body4>
                    </div>
                  )}
                </div>
                {errors.verificationCode && (
                  <div className="mt-[4px]">
                    <Body4 className={`ml-[2px] ${getMessageColor('error')}`}>
                      {errors.verificationCode.message}
                    </Body4>
                  </div>
                )}
                {isVerified && (
                  <div className="mt-[4px]">
                    <Body4 className={`ml-[2px] ${getMessageColor('success')}`}>
                      인증이 완료되었습니다.
                    </Body4>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Title3 className="text-black-400">비밀번호</Title3>
              <span className="text-red-200">*</span>
            </div>
            <Input
              {...register('password', {
                required: '비밀번호를 입력하세요',
                validate: value => {
                  const hasLower = /[a-z]/.test(value);
                  const hasNumber = /\d/.test(value);
                  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                  const validLength = value.length >= 8;

                  if (!(hasLower && hasNumber && hasSpecial && validLength)) {
                    return '영문, 숫자, 특수문자(*, -, !, @, #, $, %, ^, &)를 포함해 8자리 이상 입력해주세요.';
                  }
                  return true;
                },
              })}
              type="password"
              placeholder="비밀번호를 입력하세요"
              status={getInputStatus('password')}
            />
            {errors.password && (
              <div className="mt-[4px]">
                <Body4 className={`ml-[2px] ${getMessageColor('error')}`}>
                  {errors.password.message}
                </Body4>
              </div>
            )}

            <div className="mt-2">
              <Input
                {...register('passwordConfirm', {
                  required: '비밀번호를 다시 입력하세요',
                  validate: value => value === password || '비밀번호가 일치하지 않습니다.',
                })}
                type="password"
                placeholder="비밀번호를 다시 한 번 입력하세요"
                status={getInputStatus('passwordConfirm')}
              />
              {errors.passwordConfirm && (
                <div className="mt-[4px]">
                  <Body4 className={`ml-[2px] ${getMessageColor('error')}`}>
                    {errors.passwordConfirm.message}
                  </Body4>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex gap-3 pt-4">
            <button
              type="button"
              className="w-full p-3 border border-black-200 text-black-400 rounded hover:bg-white-100"
              onClick={handleGoHome}
            >
              <Button2>취소</Button2>
            </button>
            <button
              type="submit"
              disabled={!isFormComplete}
              className={`w-full p-3 rounded ${
                isFormComplete
                  ? 'bg-green-400 text-white-50 hover:bg-green-500'
                  : 'bg-black-300 text-white-50 cursor-not-allowed'
              }`}
            >
              <Button2>회원가입</Button2>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
