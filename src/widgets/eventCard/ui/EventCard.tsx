import RightArrow from '@/assets/svg/right-arrow.svg';
import { Body2, Button2, Title2 } from '@/shared/ui/Typography';

interface EventCardProps {
  title: string;
  description: string;
  groupName?: string;
  dayCounts?: number;
  onEventCardClick?: () => void;
}

export default function EventCard({
  title,
  description,
  groupName,
  dayCounts,
  onEventCardClick,
}: EventCardProps) {
  return (
    <div>
      {/* 그룹명 */}
      {groupName && <Body2 className="mb-[10px] text-black-400">🔎 {groupName}</Body2>}
      {/* 이벤트명, 임박일수 */}
      <div className="y-center justify-between mb-[6px]">
        <Title2 className="text-black-400">{title}</Title2>
        {dayCounts && <Body2 className="text-green-400">D-{dayCounts}</Body2>}
      </div>
      {/* 설명 */}
      {description && <Body2 className="mb-[9px] text-black-300">{description}</Body2>}
      {/* 상세 페이지 이동 버튼 */}
      <div
        className="y-center justify-end gap-1 text-green-500 cursor-pointer"
        onClick={onEventCardClick}
      >
        <Button2>이벤트 페이지로 이동</Button2>
        <img src={RightArrow} alt="오른쪽 화살표" className="w-3 h-3" />
      </div>
    </div>
  );
}
