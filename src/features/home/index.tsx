import HomeBanner from '../../widgets/home/homeBanner';
import GuideCard from '@/widgets/home/guideCard';
import { guideCardsData } from './fetchHome/api/guideData';
import HomeController from './fetchHome/ui/HomeController';

const groupsData = [
  {
    id: 1,
    title: '우리끼리 골프',
    description: 'WIcome! 골프를 사랑하고 골프를 통해 멤버들간의 정을 쌓아가고자 하는 모임',
    member: 51,
    img: '',
  },
  {
    id: 2,
    title: '우리끼리 골프',
    description: 'WIcome! 골프를 사랑하고 골프를 통해 멤버들간의 정을 쌓아가고자 하는 모임',
    member: 51,
    img: '',
  },
  {
    id: 3,
    title: '우리끼리 골프',
    description: 'WIcome! 골프를 사랑하고 골프를 통해 멤버들간의 정을 쌓아가고자 하는 모임',
    member: 51,
    img: '',
  },
  {
    id: 4,
    title: '우리끼리 골프',
    description: 'WIcome! 골프를 사랑하고 골프를 통해 멤버들간의 정을 쌓아가고자 하는 모임',
    member: 51,
    img: '',
  },
];

const activeEventsData = [
  {
    id: 1,
    title: '동산 사이드 프로젝트 종파티',
    description: '사당역에서 저녁 6시 쫑파티! 메뉴는 쭈꾸미? 같이 일정 잡아봐요~~',
    groupName: '동산팀',
    dayCounts: 45,
  },
  {
    id: 2,
    title: '이벤트를 개발팀',
    description: '수요일 10시 반 온라인 회의 디코에서',
    groupName: '개발팀',
    dayCounts: 25,
  },
];

const endedEventsData = [
  {
    id: 1,
    title: '동산 사이드 프로젝트 종파티',
    description: '사당역에서 저녁 6시 쫑파티! 메뉴는 쭈꾸미? 같이 일정 잡아봐요~~',
    groupName: '동산팀',
  },
];

export default function HomeForm() {
  if (groupsData.length === 0) {
    return (
      <div className="bg-white-50">
        <HomeBanner />
        <GuideCard cards={guideCardsData} />
      </div>
    );
  }

  return (
    <div className="bg-white-50">
      <HomeBanner />
      <HomeController
        groupsData={groupsData}
        activeEventsData={activeEventsData}
        endedEventsData={endedEventsData}
      />
    </div>
  );
}
