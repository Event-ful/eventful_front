import DateIcon from '@/shared/ui/date';
import EventCard from '@/widgets/event/eventCard';

interface EventListItemProps {
  eventId: string;
  date: string;
  eventName: string;
  startTime: string;
  location: string;
  isParticipating: boolean;
  onEventCardClick?: () => void;
  index?: number;
  isLast?: boolean;
}

/**
 * 날짜와 이벤트 카드를 함께 표시하는 컴포넌트
 */
export default function EventListItem({
  eventId,
  date,
  eventName,
  startTime,
  location,
  isParticipating,
  onEventCardClick,
  index = 0,
  isLast = false,
}: EventListItemProps) {
  return (
    <div className="flex gap-3 items-start relative">
      <div className="flex flex-col items-center relative pt-1">
        {/* 날짜 컴포넌트 */}
        <DateIcon date={date} index={index} />
        {!isLast && (
          <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 w-[1px] h-[40px] bg-black-200"></div>
        )}
      </div>

      {/* 이벤트 카드 */}
      <div className="flex-1">
        <EventCard
          eventId={eventId}
          eventName={eventName}
          startTime={startTime}
          location={location}
          isParticipating={isParticipating}
          onEventCardClick={onEventCardClick}
        />
      </div>
    </div>
  );
}
