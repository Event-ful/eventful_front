import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-day-picker/style.css';
import './datePicker.css';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'month/yy',
  className = '',
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const [month, setMonth] = useState<Date>(value ? new Date(value) : new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // value prop이 변경되면 selectedDate 업데이트
  useEffect(() => {
    if (value) {
      const newDate = new Date(value);
      setSelectedDate(newDate);
      setMonth(newDate);
    } else {
      setSelectedDate(undefined);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (date: Date | undefined) => {
    console.log(date);
    if (date) {
      setSelectedDate(date);
      onChange(format(date, 'yyyy-MM-dd'));
      setIsOpen(false);
    }
  };

  const displayValue = selectedDate ? format(selectedDate, 'yyyy-MM-dd', { locale: ko }) : '';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input
        type="text"
        value={displayValue}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className="w-full resize-none block rounded-[6px] py-[10px] pl-2 pr-[25px]
          bg-white-50 border-[1px] border-black-200 transition-colors
          font-regular text-[14px] leading-[14px]
          focus:outline-none focus:border-black-300
          text-black-500 cursor-pointer
          placeholder:text-black-300 placeholder:font-regular placeholder:text-[14px]"
      />

      {isOpen && (
        <div className="absolute bg-white-50 top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-lg border border-black-200">
          <style>{`
            .datepicker-red-nav .rdp-nav button {
              color: #ef4444 !important;
            }
            .rdp-chevron {
              fill: #00786F;
            }
            .rdp-day:hover {
              background-color: #00D5BE;
              border-radius: 6px;
            }
          `}</style>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            locale={ko}
            className="p-3 datepicker-red-nav"
            modifiersClassNames={{
              selected: 'bg-teal-500 text-white rounded-md',
            }}
          />
        </div>
      )}
    </div>
  );
};
