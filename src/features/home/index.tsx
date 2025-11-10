import HomeBanner from '../../widgets/home/homeBanner';
import GuideCard from '@/widgets/home/guideCard';
import { guideCardsData } from './fetchHome/api/guideData';
import GroupIcon from '@/assets/svg/group.svg';
import PlusIcon from '@/assets/svg/plus.svg';
import GroupCard from '@/widgets/group/groupCard';
import EventCard from '@/widgets/event/eventCard';
import EmptyState from '@/shared/ui/emptyState';
import { Button3, Title1 } from '@/shared/ui/typography';
import { useNavigate } from 'react-router-dom';

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
  // {
  //   id: 1,
  //   title: '동산 사이드 프로젝트 종파티',
  //   description: '사당역에서 저녁 6시 쫑파티! 메뉴는 쭈꾸미? 같이 일정 잡아봐요~~',
  //   groupName: '동산팀',
  // },
];

export default function HomeForm() {
  const navigate = useNavigate();

  const handleGroupCardClick = (groupId: number) => {
    console.log('그룹 카드 클릭:', groupId);
  };

  const handleEventCardClick = (eventId: number) => {
    console.log('이벤트 카드 클릭:', eventId);
  };

  const handleNewGroupClick = () => {
    navigate('/new_group');
  };

  return (
    <div className="bg-white-50">
      {/* 상단 히어로 섹션 */}
      <HomeBanner />

      {groupsData.length === 0 ? (
        <GuideCard cards={guideCardsData} />
      ) : (
        <div className="pl-[43px] pr-[104px] py-[39px]">
          <div className="flex gap-[48px]">
            <div className="w-[820px] flex-shrink-0">
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
      )}
    </div>
  );
}
