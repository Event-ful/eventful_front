import { useState } from 'react';

/** 닉네임 입력 상태 타입 */
export type InputStatus = 'default' | 'success' | 'error';

/**
 * useNickname 훅
 * 닉네임 입력, 유효성 검사 및 중복 확인 상태를 관리하는 훅입니다.
 * - 공백만 입력했는지 체크
 * - 중복 확인 상태 관리
 * - 상태별 안내 메시지 반환
 */
export const useNickname = () => {
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState<InputStatus>('default');
  const [isChecked, setIsChecked] = useState(false);

  /**
   * 닉네임 입력 변경 처리
   * - 상태 초기화 및 유효성 검사 실행
   * @param value 사용자 입력 닉네임
   */
  const handleChange = (value: string) => {
    setNickname(value);
    setStatus('default'); // 입력 시 항상 기본 상태
    setIsChecked(false);
  };

  /** 닉네임 중복 확인
   * - isChecked 상태를 true로 설정
   */
  const checkAvailability = () => {
    setIsChecked(true);
    setStatus('success');
  };

  /** 상태별 안내 메시지 반환
   * - 중복 또는 실패 → "이미 사용 중인 닉네임 입니다."
   * - 성공 → "사용 가능한 닉네임 입니다."
   * @returns 상태별 안내 문자열
   */
  const getMessage = () => {
    if (isChecked) {
      if (status === 'error') return '이미 사용 중인 닉네임 입니다.';
      if (status === 'success') return '사용 가능한 닉네임 입니다.';
    }
    return '';
  };

  /** 공백만 입력하면 버튼 비활성화 */
  const isButtonDisabled = nickname.trim().length === 0;

  return {
    nickname,
    status,
    isChecked,
    handleChange,
    checkAvailability,
    getMessage,
    isButtonDisabled,
  };
};
