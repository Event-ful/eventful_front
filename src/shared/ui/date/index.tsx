import CalendarIcon from '@/assets/svg/calendar.svg';
import { Body2 } from '../typography';

interface DateIconProps {
  date: string;
  index?: number;
}

/**
 * 날짜 아이콘 컴포넌트
 */
export default function DateIcon({ date, index = 0 }: DateIconProps) {
  // 2024-05-03 형식으로 온다고 가정, 월/일 형식으로 변환
  const formatDate = (dateString: string): string => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const day = dateObj.getDate();
    return `${month}/${day}`;
  };

  const formattedDate = formatDate(date);

  // green 400과 red 100을 번갈아 사용함
  const useGreen = index % 2 === 0;
  const bgColor = useGreen ? 'bg-green-400' : 'bg-red-100';

  return (
    <div className="bg-white rounded-[10px] border border-black-200 shadow-sm overflow-hidden w-[50px] h-[55px] flex flex-col">
      <div className={`${bgColor} flex items-center justify-center h-[23px] flex-shrink-0`}>
        <img src={CalendarIcon} alt="캘린더" className="w-4 h-4" />
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        <Body2 className="text-black-400">{formattedDate}</Body2>
      </div>
    </div>
  );
}
