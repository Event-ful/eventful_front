import LocationIcon from '@/assets/svg/location.svg';
import TimeIcon from '@/assets/svg/time.svg';
import { Body3, Title2, Title3 } from '@/shared/ui/typography';

interface EventCardProps {
  eventId: string;
  eventName: string;
  startTime: string;
  location: string;
  isParticipating: boolean;
  onEventCardClick?: () => void;
}

/**
 * 이벤트 카드 컴포넌트, 이벤트 제목, 위치 정보, 시간 정보를 표시하는 컴포넌트
 */
export default function EventCard({
  eventId: _eventId, // eslint-disable-line @typescript-eslint/no-unused-vars
  eventName,
  startTime,
  location,
  isParticipating,
  onEventCardClick,
}: EventCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-md border border-black-200 p-[15px] relative cursor-pointer"
      onClick={onEventCardClick}
    >
      <div className="absolute top-4 right-4">
        {isParticipating ? (
          <div className="bg-yellow-100 border border-black-300 rounded-[12px] px-2 py-1">
            <Body3 className="text-black-400">참여중</Body3>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 rounded-[12px] px-2 py-1">
            <Body3 className="text-green-400">미참여</Body3>
          </div>
        )}
      </div>

      {/* 이벤트 제목 */}
      <Title2 className="text-black mb-2 pr-20">{eventName}</Title2>

      {/* 위치 정보 */}
      <div className="flex items-center gap-2 mb-1">
        <img src={LocationIcon} alt="위치" className="w-4 h-4 text-gray-400" />
        <Title3 className="text-black-300">{location}</Title3>
      </div>

      {/* 시간 정보 */}
      <div className="flex items-center gap-2">
        <img src={TimeIcon} alt="시간" className="w-4 h-4 text-gray-400" />
        <Title3 className="text-black-300">{startTime}</Title3>
      </div>
    </div>
  );
}
