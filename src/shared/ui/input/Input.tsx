import React from 'react';

export type InputStatus = 'default' | 'success' | 'error';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  status?: InputStatus;
  type?: string;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  status = 'default',
  type = 'text',
  maxLength
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'error':
        return 'border-red-200 focus:border-red-200';
      case 'success':
        return 'border-blue-300 focus:border-blue-300';
      default:
        return 'border-black-200 focus:border-green-400';
    }
  };

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full h-[39px] px-3 py-2 border rounded-md outline-none transition-colors ${getStatusStyle()} ${className}`}
    />
  );
};