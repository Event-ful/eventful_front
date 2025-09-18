import { useState } from 'react';

/** 닉네임 입력 상태 타입 */
export type InputStatus = 'default' | 'success' | 'error';

/**
 * useNickname 훅
 * 닉네임 입력, 유효성 검사 및 중복 확인 상태를 관리하는 훅입니다.
 * - 닉네임 길이에 따른 상태 관리
 * - 중복 확인 상태 관리
 * - 상태별 안내 메시지 반환
 */
export const useNickname = () => {
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState<InputStatus>('default');
  const [isChecked, setIsChecked] = useState(false);

  /**
   * 닉네임 유효성 검사
   * - 0자 → 'default'
   * - 2자 미만 → 'error'
   * - 2자 이상 → 'success'
   * @param value 사용자 입력 닉네임
   */
  const validate = (value: string) => {
    if (value.length === 0) {
      setStatus('default');
      return;
    }
    setStatus(value.length < 2 ? 'error' : 'success');
  };

  /**
   * 닉네임 입력 변경 처리
   * - 상태 초기화 및 유효성 검사 실행
   * @param value 사용자 입력 닉네임
   */
  const handleChange = (value: string) => {
    setNickname(value);
    validate(value);
    setIsChecked(false);
  };

  /**
   * 닉네임 중복 확인
   * - 길이 2 이상이면 'success', 아니면 'error'
   * - isChecked 상태를 true로 설정
   */
  const checkAvailability = () => {
    setIsChecked(true);
    setStatus(nickname.length >= 2 ? 'success' : 'error');
  };

  /**
   * 상태별 안내 메시지 반환
   * - 길이 부족 → "닉네임은 2자 이상 입력해주세요."
   * - 중복 또는 실패 → "이미 사용 중인 닉네임 입니다."
   * - 성공 → "사용 가능한 닉네임 입니다."
   * @returns 상태별 안내 문자열
   */
  const getMessage = () => {
    if (nickname.length > 0 && nickname.length < 2) return '닉네임은 2자 이상 입력해주세요.';
    if (status === 'error') return '이미 사용 중인 닉네임 입니다.';
    if (status === 'success') return '사용 가능한 닉네임 입니다.';
    return '';
  };

  return { nickname, status, isChecked, handleChange, checkAvailability, getMessage };
};
