import { Input } from '@/shared/ui/Input';
import { Body4, Button2, Button3, Headline2, Title3 } from '@/shared/ui/Typography';
import Clock from '@/assets/svg/clock.svg';
import CheckCircleBlue from '@/assets/svg/check_circle_blue.svg';
import CloseCircleRed from '@/assets/svg/close_circle_red.svg';

import { useNickname } from '../model/useNickname';
import { useEmail } from '../model/useEmail';
import { usePassword } from '../model/usePassword';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const navigate = useNavigate();

  const {
    nickname,
    status: nicknameStatus,
    isChecked,
    isButtonDisabled,
    handleChange: handleNicknameChange,
    checkAvailability,
    getMessage: getNicknameMessage,
  } = useNickname();

  const {
    email,
    status: emailStatus,
    isSent,
    isVerified,
    verificationCode,
    verificationStatus,
    timer,
    isTimerExpired,
    handleEmailChange,
    handleSendVerification,
    handleResendVerification,
    handleVerificationCodeChange,
    handleVerifyCode,
    getEmailMessage,
    getVerificationMessage,
    formatTime,
  } = useEmail();

  const {
    password,
    passwordStatus,
    passwordConfirm,
    passwordConfirmStatus,
    handlePasswordChange,
    handlePasswordConfirmChange,
    getPasswordMessage,
    getPasswordConfirmMessage,
  } = usePassword();

  /** 전체 폼 유효성 검사 */
  const isFormValid = () =>
    nicknameStatus === 'success' &&
    isChecked &&
    emailStatus === 'success' &&
    isVerified &&
    passwordStatus === 'success' &&
    passwordConfirmStatus === 'success';

  /** 메시지 색상 */
  const getMessageColor = (status: 'default' | 'success' | 'error') => {
    if (status === 'error') return 'text-red-200';
    if (status === 'success') return 'text-blue-300';
    return 'text-black-300';
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="h-[100%] bg-white-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white-50 p-8 rounded-xl border-[1px] border-black-200">
        <Headline2 className="text-black-400 text-center mb-8">회원가입</Headline2>

        <div className="space-y-6">
          {/* 닉네임 */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Title3 className="text-black-400">닉네임</Title3>
              <span className="text-red-200">*</span>
            </div>
            <div className="flex gap-2">
              <Input
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="닉네임을 입력하세요"
                className="flex-1"
                status={nicknameStatus}
              />
              {/* 닉네임 중복검사 결과에 따른 버튼/아이콘 표시 */}
              {isChecked ? (
                <div className="h-[39px] flex items-center justify-center px-2">
                  {nicknameStatus === 'success' ? (
                    <img src={CheckCircleBlue} alt="사용 가능한 닉네임" className="w-6 h-6" />
                  ) : (
                    <img src={CloseCircleRed} alt="사용 불가능한 닉네임" className="w-6 h-6" />
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={checkAvailability}
                  disabled={isButtonDisabled}
                  className={`h-[39px] px-4 rounded whitespace-nowrap ${isButtonDisabled ? 'bg-black-300 text-white-50 cursor-not-allowed' : 'bg-green-400 text-white-50 hover:bg-green-500'}`}
                >
                  <Button3>중복검사</Button3>
                </button>
              )}
            </div>
            {/* 닉네임 중복검사 결과에 따른 메세지 표시 */}
            {isChecked && nicknameStatus !== 'default' && (
              <div className="mt-[4px]">
                <Body4 className={`ml-[2px] ${getMessageColor(nicknameStatus)}`}>
                  {getNicknameMessage()}
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
                value={email}
                onChange={handleEmailChange}
                placeholder="이메일을 입력하세요"
                className="flex-1"
                status={emailStatus}
              />
              {!isSent ? (
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={emailStatus !== 'success'}
                  className={`h-[39px] px-3 rounded whitespace-nowrap ${emailStatus !== 'success' ? 'bg-black-300 text-white-50 cursor-not-allowed' : 'bg-green-400 text-white-50 hover:bg-green-500'}`}
                >
                  <Button3>인증 번호 전송</Button3>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={emailStatus !== 'success' || (timer > 0 && !isTimerExpired)}
                  className={`h-[39px] px-3 rounded whitespace-nowrap ${
                    emailStatus !== 'success' || (timer > 0 && !isTimerExpired)
                      ? 'bg-black-300 text-white-50 cursor-not-allowed'
                      : 'bg-green-400 text-white-50 hover:bg-green-500'
                  }`}
                >
                  <Button3>재전송</Button3>
                </button>
              )}
            </div>
            {/* 이메일 형식에 따른 메세지 표시 */}
            {emailStatus === 'error' && (
              <div className="mt-[4px]">
                <Body4 className={`ml-[2px] ${getMessageColor(emailStatus)}`}>
                  {getEmailMessage()}
                </Body4>
              </div>
            )}

            {/* 인증번호 입력 */}
            {isSent && (
              <div className="mt-2">
                <div className="flex gap-2">
                  <Input
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    placeholder="인증번호를 입력하세요"
                    className="w-[250px]"
                    status={verificationStatus}
                  />
                  {/* 인증이 완료된 경우에만 체크 아이콘 표시, 그 외에는 인증하기 버튼 표시 */}
                  {isVerified ? (
                    <div className="h-[39px] flex items-center justify-center px-2">
                      <img src={CheckCircleBlue} alt="인증 완료" className="w-6 h-6" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={verificationCode.length === 0}
                      className={`h-[39px] px-4 rounded whitespace-nowrap ${
                        verificationCode.length === 0
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
                {/* 이메일 인증 번호 검증에 따른 메세지 표시 */}
                {verificationStatus !== 'default' && (
                  <div className="mt-[4px]">
                    <Body4 className={`ml-[2px] ${getMessageColor(verificationStatus)}`}>
                      {getVerificationMessage()}
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
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요"
              status={passwordStatus}
            />
            {/* 비밀번호 유효성 검사에 따른 메세지 표시 */}
            {passwordStatus === 'error' && (
              <div className="mt-[4px]">
                <Body4 className={`ml-[2px] ${getMessageColor(passwordStatus)}`}>
                  {getPasswordMessage()}
                </Body4>
              </div>
            )}

            <div className="mt-2">
              <Input
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                placeholder="비밀번호를 다시 한 번 입력하세요"
                status={passwordConfirmStatus}
              />
              {/* 비밀번호 일치 확인 메세지 표시 */}
              {passwordConfirmStatus === 'error' && (
                <div className="mt-[4px]">
                  <Body4 className={`ml-[2px] ${getMessageColor(passwordConfirmStatus)}`}>
                    {getPasswordConfirmMessage()}
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
              disabled={!isFormValid()}
              className={`w-full p-3 rounded ${isFormValid() ? 'bg-green-400 text-white-50 hover:bg-green-500' : 'bg-black-300 text-white-50 cursor-not-allowed'}`}
            >
              <Button2>회원가입</Button2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
