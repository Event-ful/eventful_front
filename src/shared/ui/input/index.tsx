import { useState, useRef } from 'react';
import X from '@/assets/svg/X.svg';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  placeholder?: string;
  className?: string;
  /** 최대 입력 가능한 글자 수 */
  maxLength?: number;
}

/**
 * 사용자 텍스트 입력을 위한 Input 컴포넌트
 *
 * @description
 * - 포커스 및 입력 상태에 따른 시각적 변화
 * - 텍스트 입력 시 X 버튼으로 내용 삭제 가능
 * - 최대 글자 수 제한 및 카운터 표시
 *
 */
export const Input = ({ className, value, onChange, height, placeholder, maxLength }: InputProps) => {
  /** 입력 필드의 포커스 상태 */
  const [isFocused, setIsFocused] = useState(false);
  /** 입력 필드 DOM 요소 참조 */
  const inputRef = useRef<HTMLInputElement>(null);

  /** 사용자가 텍스트를 입력했는지 여부 */
  const isTyping = value.length > 0;

  /**
   * 입력된 텍스트를 모두 삭제하고 포커스를 유지하는 함수
   */
  const clearText = () => {
    onChange('');
    inputRef.current?.focus();
  };

  /**
   * 입력값 변경 처리 함수
   * maxLength가 설정된 경우 글자 수 제한을 적용
   *
   * @param e - 입력 변경 이벤트
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!maxLength || val.length <= maxLength) {
      onChange(val);
    }
  };

  /**
   * 포커스 및 입력 상태에 따른 보더 색상을 반환
   *
   * @returns Tailwind CSS 보더 색상 클래스
   */
  const getBorderColor = () => {
    if (isFocused || isTyping) return 'border-black-300';
    return 'border-black-200';
  };

  /**
   * 입력 상태에 따른 텍스트 색상을 반환
   *
   * @returns Tailwind CSS 텍스트 색상 클래스
   */
  const getTextColor = () => {
    if (isTyping) return 'text-black-500';
    return 'text-black-300';
  };

  return (
    <div className={`w-full m-0 ${className ?? ''}`}>
      <div className="relative">
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused || isTyping ? '' : placeholder}
          style={{ height }}
          className={`
            w-full resize-none block rounded-[6px] py-[10px] pl-2 pr-[25px]
            bg-white-50 border-[1px] transition-colors
            font-regular text-[14px] leading-[14px]
            focus:outline-none
            ${getBorderColor()}
            ${getTextColor()}
            placeholder:text-black-300 placeholder:font-regular placeholder:text-[14px]
            ${isFocused ? 'caret-black-400' : ''}
          `}
        />
        {/* 포커스 및 입력 상태일 때만 삭제 버튼 표시 */}
        {isTyping && isFocused && (
          <button
            onMouseDown={e => {
              e.preventDefault();
              clearText();
            }}
            className="absolute right-[5px] top-[6px] p-1 rounded transition-colors"
            type="button"
            aria-label="입력 내용 삭제"
          >
            <img src={X} alt="cancel" className="w-[12px] h-[12px]" />
          </button>
        )}
      </div>

      {/* 최대 글자 수가 설정된 경우 글자 수 카운터 표시 */}
      {maxLength && (
        <div className={`mt-[4px] text-right text-[12px] font-regular ${value.length == maxLength ? 'text-red-200' : 'text-black-300'}`}>
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
};
