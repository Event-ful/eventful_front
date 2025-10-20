import { useState, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'height'> {
  height?: string;
  /** 최대 입력 가능한 글자 수 */
  status?: 'default' | 'success' | 'error';
}

/**
 * 사용자 텍스트 입력을 위한 Input 컴포넌트
 *
 * @description
 * - React Hook Form과 호환 가능 (forwardRef 사용)
 * - 포커스 및 입력 상태에 따른 시각적 변화
 * - 텍스트 입력 시 X 버튼으로 내용 삭제 가능
 * - 최대 글자 수 제한 및 카운터 표시
 *
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      height,
      placeholder,
      status = 'default',
      type = 'text',
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    /** 입력 필드의 포커스 상태 */
    const [isFocused, setIsFocused] = useState(false);

    /** 사용자가 텍스트를 입력했는지 여부 */
    const isTyping = value ? String(value).trim().length > 0 : false;

    /**
     * 포커스 및 입력 상태에 따른 보더 색상을 반환
     *
     * @returns Tailwind CSS 보더 색상 클래스
     */
    const getBorderColor = () => {
      if (status === 'error') return 'border-red-200';
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

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={`w-full m-0 ${className ?? ''}`}>
        <div className="relative">
          <input
            ref={ref}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused || isTyping ? '' : placeholder}
            type={type}
            style={{ height }}
            className={`
              w-full resize-none block rounded-[6px] py-[10px] pl-2 pr-[25px]
              bg-white-50 border-[1px] transition-colors
              font-regular text-[14px] leading-[14px]
              focus:outline-none
              ${getBorderColor()}
              ${getTextColor()}
              placeholder:text-black-300 placeholder:font-regular placeholder:text-[14px]
              ${isFocused ? 'text-black-400' : ''}
            `}
            {...rest}
          />
        </div>
      </div>
    );
  },
);
