import { useState, forwardRef, InputHTMLAttributes } from 'react';
import X from '@/assets/svg/X.svg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'height'> {
  height?: string;
  /** 최대 입력 가능한 글자 수 */
  maxLength?: number;
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
      onChange,
      height,
      placeholder,
      maxLength,
      status = 'default',
      type = 'text',
      ...rest
    },
    ref,
  ) => {
    /** 입력 필드의 포커스 상태 */
    const [isFocused, setIsFocused] = useState(false);

    /** 사용자가 텍스트를 입력했는지 여부 */
    const isTyping = value ? String(value).length > 0 : false;

    /**
     * 입력된 텍스트를 모두 삭제하는 함수
     */
    const clearText = () => {
      if (onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
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
        onChange?.(e);
      }
    };

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

    const currentValue = value ? String(value) : '';

    return (
      <div className={`w-full m-0 ${className ?? ''}`}>
        <div className="relative">
          <input
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
              ${isFocused ? 'caret-black-400' : ''}
            `}
            {...rest}
          />
          {/* 포커스 및 입력 상태일 때만 삭제 버튼 표시 */}
          {isTyping && isFocused && (
            <button
              onMouseDown={e => {
                e.preventDefault();
                clearText();
              }}
              className="absolute right-[5px] top-[10px] p-1 rounded transition-colors"
              type="button"
              aria-label="입력 내용 삭제"
            >
              <img src={X} alt="cancel" className="w-[12px] h-[12px]" />
            </button>
          )}
        </div>

        {/* 최대 글자 수가 설정된 경우 글자 수 카운터 표시 */}
        {maxLength && (
          <div
            className={`mt-[4px] text-right text-[12px] font-regular ${
              currentValue.length === maxLength ? 'text-red-200' : 'text-black-300'
            }`}
          >
            {currentValue.length} / {maxLength}
          </div>
        )}
      </div>
    );
  },
);
