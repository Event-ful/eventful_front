import { useState, useEffect } from 'react';
import { InputStatus } from './useNickname';

/**
 * useEmail 훅
 * 이메일 입력, 인증번호 전송 및 확인, 타이머 관리 기능을 제공하는 훅입니다.
 * - 이메일 형식 유효성 검사
 * - 인증번호 전송/재전송
 * - 인증번호 확인
 * - 타이머 카운트 및 만료 상태 관리
 * - 상태별 안내 메시지 반환
 */
export const useEmail = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<InputStatus>('default');

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<InputStatus>('default');

  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  /**
   * 이메일 형식 유효성 검사
   * - 이메일이 빈 문자열이면 상태를 'default'로 설정
   * - 올바른 이메일 형식이면 'success', 아니면 'error' 설정
   * @param value 사용자 입력 이메일
   */
  const validateEmail = (value: string) => {
    if (value.length === 0) {
      setStatus('default');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|kr|co\.kr)$/i;
    setStatus(emailRegex.test(value) ? 'success' : 'error');
  };

  /**
   * 이메일 입력 변경 처리
   * - 이메일 값 업데이트
   * - 유효성 검사 실행
   * - 이전 인증 상태 초기화
   * @param value 사용자 입력 이메일
   */
  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateEmail(value);
    setIsSent(false);
    setVerificationCode('');
    setVerificationStatus('default');
    setIsVerified(false);
    setTimer(0);
    setIsTimerExpired(false);
  };

  /**
   * 인증번호 전송
   * - 이메일 형식이 올바른 경우만 실행
   * - 타이머 10초 시작
   * - 인증 상태 초기화
   */
  const handleSendVerification = () => {
    if (status === 'success') {
      setIsSent(true);
      setVerificationStatus('default');
      setVerificationCode('');
      setIsVerified(false);
      setTimer(10);
      setIsTimerExpired(false);
    }
  };

  /**
   * 인증번호 재전송
   * - 이메일 형식이 올바른 경우만 실행
   * - 타이머 10초 재시작
   * - 인증 상태 초기화
   */
  const handleResendVerification = () => {
    if (status === 'success') {
      setVerificationStatus('default');
      setVerificationCode('');
      setIsVerified(false);
      setTimer(10);
      setIsTimerExpired(false);
    }
  };

  /**
   * 인증번호 입력 변경 처리
   * @param value 사용자 입력 인증번호
   */
  const handleVerificationCodeChange = (value: string) => setVerificationCode(value);

  /**
   * 인증번호 확인
   * - 타이머가 만료되면 'error' 상태로 설정
   * - 인증번호가 맞으면 'success', 틀리면 'error'
   * - 성공 시 타이머 종료
   */
  const handleVerifyCode = () => {
    if (isTimerExpired) {
      setVerificationStatus('error');
      setIsVerified(false);
      return;
    }

    if (verificationCode.length > 0) {
      const isValid = verificationCode === '123456'; // 임시 코드
      setVerificationStatus(isValid ? 'success' : 'error');
      setIsVerified(isValid);
      if (isValid) setTimer(0);
    } else {
      setVerificationStatus('error');
      setIsVerified(false);
    }
  };

  /**
   * 이메일 입력 상태 메시지 반환
   * @returns 올바른 이메일이 아닌 경우 안내 문자열
   */
  const getEmailMessage = () => (status === 'error' ? '올바른 이메일을 입력해주세요' : '');

  /**
   * 인증번호 상태 메시지 반환
   * @returns 타이머 만료, 입력 없음, 인증 실패/성공에 따른 안내 문자열
   */
  const getVerificationMessage = () => {
    if (isTimerExpired) return '인증 시간이 만료되었습니다.';
    if (verificationStatus === 'error') return verificationCode.length === 0 ? '인증번호를 입력해주세요.' : '인증번호가 올바르지 않습니다.';
    if (verificationStatus === 'success') return '인증이 완료되었습니다.';
    return '';
  };

  /**
   * 타이머 카운트
   * - timer 상태가 0보다 크면 1초 단위로 감소
   * - 0이 되면 isTimerExpired를 true로 설정
   */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
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
   * 초 단위 타이머를 "MM:SS" 형식으로 변환
   * @param seconds 초 단위
   * @returns "MM:SS" 문자열
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    email,
    status,
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
  };
};
