/**
 * 초를 MM:SS 형식으로 변환
 *
 * @param {number} seconds - 변환할 시간 (초 단위)
 * @returns {string} "MM:SS" 형식의 문자열
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
export const getMessageColor = (status: 'default' | 'success' | 'error') => {
  if (status === 'error') return 'text-red-200';
  if (status === 'success') return 'text-blue-300';
  return 'text-black-300';
};
