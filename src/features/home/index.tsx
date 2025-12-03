import HomeBanner from '../../widgets/home/homeBanner';
import GuideCard from '@/widgets/home/guideCard';
import { guideCardsData } from './fetchHome/api/guideData';
import HomeController from './fetchHome/ui/HomeController';
import GroupCard from '@/widgets/group/groupCard';
import EventCard from '@/widgets/event/eventCard';
import EmptyState from '@/shared/ui/emptyState';
import { Title1 } from '@/shared/ui/typography';

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
  const handleGroupCardClick = (groupId: number) => {
    console.log('그룹 카드 클릭:', groupId);
  };

  const handleEventCardClick = (eventId: number) => {
    console.log('이벤트 카드 클릭:', eventId);
  };

  if (groupsData.length === 0) {
    return (
      <div className="bg-white-50 w-full">
        <HomeBanner />
        <GuideCard cards={guideCardsData} />
      </div>
    );
  }

  return (
    <div className="bg-white-50 w-full">
      <HomeBanner />
      <div className="pl-[43px] pr-[104px] py-[39px]">
        <div className="flex gap-[48px]">
          {/* 그룹 영역 */}
          <div className="w-[820px] flex-shrink-0">
            <HomeController />
            <div className="flex flex-wrap gap-[20px]">
              {groupsData.map(group => (
                <div key={group.id} className="w-[260px]">
                  <GroupCard
                    title={group.title}
                    description={group.description}
                    member={group.member}
                    img={group.img}
                    onGroupCardClick={() => handleGroupCardClick(group.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 이벤트 영역 */}
          <div className="w-[400px] flex-shrink-0">
            <section className="mb-12">
              <Title1 className="mb-6">내 이벤트</Title1>

              {activeEventsData.length === 0 ? (
                <EmptyState message="참여중인 이벤트가 없어요." />
              ) : (
                <div>
                  {activeEventsData.map((event, index) => (
                    <div key={event.id}>
                      <EventCard
                        title={event.title}
                        description={event.description}
                        groupName={event.groupName}
                        dayCounts={event.dayCounts}
                        onEventCardClick={() => handleEventCardClick(event.id)}
                      />
                      {index < activeEventsData.length - 1 && (
                        <hr className="my-3 border-t border-black-200" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <Title1 className="mb-6">종료된 이벤트</Title1>

              {endedEventsData.length === 0 ? (
                <EmptyState message="종료된 이벤트가 없어요." />
              ) : (
                <div>
                  {endedEventsData.map((event, index) => (
                    <div key={event.id}>
                      <EventCard
                        title={event.title}
                        description={event.description}
                        groupName={event.groupName}
                        onEventCardClick={() => handleEventCardClick(event.id)}
                      />
                      {index < endedEventsData.length - 1 && (
                        <hr className="my-3 border-t border-black-200" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
