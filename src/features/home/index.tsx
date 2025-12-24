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
    eventId: '1',
    date: '2024-01-15',
    eventName: '동산 사이드 프로젝트 쫑파티',
    startTime: '오후 17:30',
    location: '사당역 5번 출구 앞',
    isParticipating: false,
  },
  {
    eventId: '2',
    date: '2024-01-16',
    eventName: '동산 사이드 프로젝트 쫑파티',
    startTime: '오후 17:30',
    location: '사당역 5번 출구 앞',
    isParticipating: true,
  },
  {
    eventId: '3',
    date: '2024-01-20',
    eventName: '개발팀 온라인 회의',
    startTime: '오전 11:30',
    location: '디스코드',
    isParticipating: true,
  },
];

const endedEventsData = [
  {
    eventId: '4',
    date: '2024-01-10',
    eventName: '동산 사이드 프로젝트 쫑파티',
    startTime: '오후 18:00',
    location: '사당역 5번 출구 앞',
    isParticipating: true,
  },
];

export default function HomeForm() {
  const handleGroupCardClick = (groupId: number) => {
    console.log('그룹 카드 클릭:', groupId);
  };

  const handleEventCardClick = (eventId: string) => {
    console.log('이벤트 카드 클릭:', eventId);
  };

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
                <div className="space-y-3">
                  {activeEventsData.map(event => (
                    <EventCard
                      key={event.eventId}
                      eventId={event.eventId}
                      eventName={event.eventName}
                      startTime={event.startTime}
                      location={event.location}
                      isParticipating={event.isParticipating}
                      onEventCardClick={() => handleEventCardClick(event.eventId)}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <Title1 className="mb-6">종료된 이벤트</Title1>

              {endedEventsData.length === 0 ? (
                <EmptyState message="종료된 이벤트가 없어요." />
              ) : (
                <div className="space-y-3">
                  {endedEventsData.map(event => (
                    <EventCard
                      key={event.eventId}
                      eventId={event.eventId}
                      eventName={event.eventName}
                      startTime={event.startTime}
                      location={event.location}
                      isParticipating={event.isParticipating}
                      onEventCardClick={() => handleEventCardClick(event.eventId)}
                    />
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
