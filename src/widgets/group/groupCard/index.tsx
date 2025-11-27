import { Body2, Body4, Button2, Title2 } from '@/shared/ui/typography';
import Member from '@/assets/svg/member.svg';
import RightArrow from '@/assets/svg/right-arrow.svg';
import DefaultGroupImage from '@/assets/img/group.png';

interface GroupCardProps {
  title: string;
  description: string;
  member: number;
  img: string;
  onGroupCardClick?: () => void;
}

export default function GroupCard({
  title,
  description,
  member,
  img,
  onGroupCardClick,
}: GroupCardProps) {
  return (
    <div className="bg-white-100 w-full flex-shrink-0 rounded-xl shadow-md border border-black-200 p-[14px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      <div className="border w-full h-[150px] overflow-hidden flex-shrink-0">
        <img
          src={img || DefaultGroupImage}
          alt="그룹 이미지"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="px-1 my-3">
          <Title2 className="text-black-400 mb-1">{title}</Title2>
          <Body2 className="text-black-400 text-2line">{description}</Body2>
        </div>

        <div className="y-center justify-between">
          <div className="y-center gap-1">
            <img src={Member} alt="멤버 수" className="w-4 h-4" />
            <Body4>{member}명</Body4>
          </div>

          <div
            className="y-center gap-1 text-green-500 font-medium cursor-pointer"
            onClick={onGroupCardClick}
          >
            <Button2>그룹 페이지로 이동</Button2>
            <img src={RightArrow} alt="오른쪽 화살표" className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
