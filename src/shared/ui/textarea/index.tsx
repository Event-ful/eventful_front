import { useState, useRef } from 'react';
import X from '@/assets/svg/X.svg';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  placeholder?: string;
  errorMessage?: string;
  successMessage?: string;
  status?: 'success' | 'error';
  className?: string;
  maxLength?: number;
}

export const Textarea = ({ value, onChange, height, placeholder, errorMessage, successMessage, status, className, maxLength }: TextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isTyping = value.length > 0;

  const clearText = () => {
    onChange('');
    textareaRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!maxLength || val.length <= maxLength) {
      onChange(val);
    }
  };

  const getBorderColor = () => {
    if (status === 'error') return 'border-red-200';
    if (isFocused || isTyping) return 'border-black-300';
    return 'border-black-200';
  };

  const getTextColor = () => {
    if (isTyping) return 'text-black-500';
    return 'text-black-300';
  };

  const getMessageColor = () => {
    if (status === 'error') return 'text-red-200';
    if (status === 'success') return 'text-blue-300';
    return 'text-black-300';
  };

  const getMessage = () => {
    if (status === 'error') return errorMessage;
    if (status === 'success') return successMessage;
    return '';
  };

  return (
    <div className={`w-full m-0 ${className ?? ''}`}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused || isTyping ? '' : placeholder}
          rows={1}
          style={{ height }}
          className={`
            w-full resize-none block rounded py-2 pl-2 pr-4
            bg-white-50 border-[1px] transition-colors
            font-regular text-[12px] leading-[14px]
            focus:outline-none
            ${getBorderColor()}
            ${getTextColor()}
            placeholder:text-black-300 placeholder:font-regular placeholder:text-[12px]
            ${isFocused ? 'caret-black-400' : ''}
          `}
        />

        {isTyping && isFocused && (
          <button
            onMouseDown={e => {
              e.preventDefault();
              clearText();
            }}
            className="absolute right-[5px] top-[6px] p-1 rounded transition-colors"
            type="button"
          >
            <img src={X} alt="cancel" className="w-[12px] h-[12px]" />
          </button>
        )}
      </div>

      {maxLength && (
        <div className={`mt-[4px] text-right text-[12px] font-regular ${value.length == maxLength ? 'text-red-200' : 'text-black-300'}`}>
          {value.length} / {maxLength}
        </div>
      )}

      {status && (
        <div className="mt-[4px]">
          <p className={`ml-[2px] font-regular text-[12px] ${getMessageColor()}`}>{getMessage()}</p>
        </div>
      )}
    </div>
  );
};
