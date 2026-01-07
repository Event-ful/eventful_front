import { Input } from '@/shared/ui/input';
import { Body4, Button2, Button3, Headline2, Title3 } from '@/shared/ui/typography';
import Clock from '@/assets/svg/clock.svg';
import CheckCircleBlue from '@/assets/svg/check_circle_blue.svg';
import CloseCircleRed from '@/assets/svg/close_circle_red.svg';
import { useSignUpForm } from '../model/useSignUpForm';
import { getMessageColor, formatTime } from '../model/utils';
import { useNavigate } from 'react-router-dom';

/**
 * 회원가입 폼 컴포넌트
 *
 * @description
 * SignUpForm UI 컴포넌트입니다.
 * 상태 관리, API 호출, 유효성 검증 등은 useSignUpForm 훅에서 처리됩니다.
 *
 * @returns {JSX.Element} 회원가입 폼 UI
 */
export default function SignUpForm() {
  const navigate = useNavigate();

  const {
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
  } = useSignUpForm();

  const nickname = watch('nickname');
  const email = watch('email');
  const verificationCode = watch('verificationCode');

  const handleGoHome = () => {
    navigate('/');
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
                  {...register('nickname', { required: '닉네임을 입력하세요' })}
                  value={nickname || ''}
                  placeholder="닉네임을 입력하세요"
                  type="text"
                  maxLength={10}
                  status={getInputStatus('nickname')}
                />
                <div
                  className={`absolute bottom-[4px] right-[6px] text-[12px] font-regular ${
                    (nickname?.length || 0) > 10 ? 'text-red-200' : 'text-black-300'
                  }`}
                >
                  {nickname?.length || 0} / 10
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
                  disabled={!nickname?.trim()}
                  className={`h-[39px] px-4 rounded whitespace-nowrap ${
                    !nickname?.trim()
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
                    <div className="flex items-center m-auto w-[55px]">
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
                  validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.',
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
