import RightArrow from '@/assets/svg/right-arrow.svg';
import { Body2, Button2, Title2 } from '../typography';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  groupName?: string;
  dayCounts?: number;
}

export const EventCard = ({ id, title, description, groupName, dayCounts }: EventCardProps) => {
  const navigate = useNavigate();

  const goToEventDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/event/${id}`);
  };

  return (
    <div>
      {/* 그룹명 */}
      {groupName && <Body2 className="mb-[10px] text-black-400">🔎 {groupName}</Body2>}
      {/* 이벤트명, 임박일수 */}
      <div className="x-center justify-between mb-[6px]">
        <Title2 className="text-black-400">{title}</Title2>
        {dayCounts && <Body2 className="text-green-400">D-{dayCounts}</Body2>}
      </div>
      {/* 설명 */}
      {description && <Body2 className="mb-[9px] text-black-300">{description}</Body2>}
      {/* 상세 페이지 이동 버튼 */}
      <div className="x-center justify-end gap-1 text-green-500 cursor-pointer" onClick={goToEventDetail}>
        <Button2>이벤트 페이지로 이동</Button2>
        <img src={RightArrow} alt="오른쪽 화살표" className="w-3 h-3" />
      </div>
    </div>
  );
};
