import GroupIcon from '@/assets/svg/group.svg';
import PlusIcon from '@/assets/svg/plus.svg';
import { Button3, Title1 } from '@/shared/ui/typography';
import { useNavigate } from 'react-router-dom';

export default function HomeController() {
  const navigate = useNavigate();

  const handleNewGroupClick = () => {
    navigate('/new_group');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <img src={GroupIcon} alt="그룹" className="w-6 h-6" />
        <Title1>내 그룹</Title1>
      </div>
      <button
        onClick={handleNewGroupClick}
        className="flex items-center gap-2 border border-black-200 px-[10px] py-[6px] bg-white-100 text-black-400 rounded-[5px]"
      >
        <Button3>새 그룹 추가하기</Button3>
        <img src={PlusIcon} alt="추가" />
      </button>
    </div>
  );
}
