import { useState } from 'react';
import { InputStatus } from './useNickname';

/**
 * usePassword 훅
 * 비밀번호와 비밀번호 확인 입력 상태를 관리하는 훅입니다.
 * - 비밀번호 유효성 검사 (대문자, 소문자, 숫자, 특수문자, 8자리 이상)
 * - 비밀번호 확인 일치 여부 검사
 * - 상태별 안내 메시지 반환
 */
export const usePassword = () => {
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<InputStatus>('default');

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmStatus, setPasswordConfirmStatus] = useState<InputStatus>('default');

  /**
   * 비밀번호 유효성 검사
   * - 8자리 이상
   * - 대문자, 소문자, 숫자, 특수문자 포함
   * @param value 입력 비밀번호
   */
  const validatePassword = (value: string) => {
    if (value.length === 0) {
      setPasswordStatus('default');
      return;
    }
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const validLength = value.length >= 8;
    setPasswordStatus(hasUpper && hasLower && hasNumber && hasSpecial && validLength ? 'success' : 'error');
  };

  /**
   * 비밀번호 확인 유효성 검사
   * - 비밀번호와 일치 여부 확인
   * @param value 입력 비밀번호 확인
   */
  const validatePasswordConfirm = (value: string) => {
    if (value.length === 0) {
      setPasswordConfirmStatus('default');
      return;
    }
    setPasswordConfirmStatus(value === password ? 'success' : 'error');
  };

  /**
   * 비밀번호 입력 변경 처리
   * - 상태 업데이트 및 유효성 검사
   * - 비밀번호 확인이 이미 입력되어 있다면 재검사
   * @param value 입력 비밀번호
   */
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePassword(value);
    if (passwordConfirm.length > 0) validatePasswordConfirm(passwordConfirm);
  };

  /**
   * 비밀번호 확인 입력 변경 처리
   * - 상태 업데이트 및 유효성 검사
   * @param value 입력 비밀번호 확인
   */
  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    validatePasswordConfirm(value);
  };

  /**
   * 비밀번호 상태 안내 메시지 반환
   * - 조건 미충족 시 안내
   * @returns 안내 문자열
   */
  const getPasswordMessage = () => (passwordStatus === 'error' ? '영문 대소문자, 숫자, 특수문자(*, -, !, @, #, $, %, ^, &)를 포함해 8자리 이상 입력해주세요.' : '');

  /**
   * 비밀번호 확인 상태 안내 메시지 반환
   * - 불일치 시 안내
   * @returns 안내 문자열
   */
  const getPasswordConfirmMessage = () => (passwordConfirmStatus === 'error' ? '비밀번호가 일치하지 않습니다.' : '');

  return {
    password,
    passwordStatus,
    passwordConfirm,
    passwordConfirmStatus,
    handlePasswordChange,
    handlePasswordConfirmChange,
    getPasswordMessage,
    getPasswordConfirmMessage,
  };
};
