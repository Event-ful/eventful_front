import PlusBlack from '@/assets/svg/plus_black.svg';
import ShareBlack from '@/assets/svg/share_black.svg';
import EventBlack from '@/assets/svg/event_black.svg';
import VoteBlack from '@/assets/svg/vote_black.svg';
import WonBlack from '@/assets/svg/won_black.svg';
import { GuideCardProps } from '../ui/guideCard';

const guideCardsData: GuideCardProps[] = [
  {
    number: '1',
    title: '내 그룹',
    description: '먼저 관심있는 그룹에 참여해보세요.',
    backgroundColor: 'bg-blue-500',
    width: 'grid-cols-1',
    features: [
      {
        icon: <img src={PlusBlack} className="w-3 h-3" />,
        title: '그룹 참여하기',
        description: '관심사가 비슷한 사람들과 함께하는 다양한 그룹에 참여할 수 있습니다.',
        bgColor: 'bg-blue-50',
        hoverColor: 'hover:bg-blue-200',
        iconBg: 'bg-blue-500',
      },
      {
        icon: <img src={ShareBlack} />,
        title: '참가 링크 공유 ',
        description: '그룹원들과 참가 링크를 공유해서 더 많은 사람들을 초대해보세요.',
        bgColor: 'bg-cyan-50',
        hoverColor: 'hover:bg-cyan-100',
        iconBg: 'bg-cyan-500',
      },
    ],
  },
  {
    number: '2',
    title: '내 이벤트',
    description: '그룹 참여 후 이벤트에서 일정을 관리하세요',
    backgroundColor: 'bg-green-400',
    width: 'grid-cols-2',
    features: [
      {
        icon: <img src={EventBlack} className="w-5 h-5" />,
        title: '이벤트 참여하기',
        description: '그룹 내에서 진행되는 다양한 이벤트에 참여할 수 있습니다.',
        bgColor: 'bg-teal-50',
        hoverColor: 'hover:bg-teal-100',
        iconBg: 'bg-teal-500',
      },
      {
        icon: <img src={PlusBlack} />,
        title: '일정 생성',
        description: '이벤트 참여자들과 함꼐할 구체적인 일정을 만들고 관리해보세요.',
        bgColor: 'bg-orange-50',
        hoverColor: 'hover:bg-orange-100',
        iconBg: 'bg-orange-500',
      },
      {
        icon: <img src={VoteBlack} className="w-5 h-5" />,
        title: '투표로 결정',
        description: '일정의 시간이나 장소를 투표를 통해 민주적으로 결정할 수 있습니다.',
        bgColor: 'bg-blue-50',
        hoverColor: 'hover:bg-blue-200',
        iconBg: 'bg-blue-500',
      },
      {
        icon: <img src={WonBlack} className="w-5 h-5" />,
        title: '간편한 정산',
        description: '이벤트에서 발생한 비용을 자동으로 계산하여 쉽게 정산할 수 있습니다.',
        bgColor: 'bg-pink-50',
        hoverColor: 'hover:bg-pink-100',
        iconBg: 'bg-pink-500',
      },
    ],
  },
];

export { guideCardsData };
