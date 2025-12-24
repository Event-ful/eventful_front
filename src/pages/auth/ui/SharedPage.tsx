import { useState } from 'react';
import { Textarea } from '@/shared/ui/textarea';
import {
  Title1,
  Title2,
  Title3,
  Title4,
  Headline1,
  Headline2,
  Body1,
  Body2,
  Body4,
  Body4Emphasized,
  Body3Underlined,
  Button1,
  Button2,
  Button3,
} from '@/shared/ui/typography';
import { Input } from '@/shared/ui/input';
import GroupCard from '@/widgets/group/groupCard';
import EventCard from '@/widgets/event/eventCard';
import DateIcon from '@/shared/ui/date';

export default function SharedComponents() {
  const [inputText, setInputText] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [texts, setTexts] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  /** 메시지 표시 상태 ('default': 기본, 'success': 성공, 'error': 오류) */
  const [status, setStatus] = useState<'success' | 'error' | 'default'>('default');
  /** 오류 또는 성공 메시지 내용 */
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCheck = () => {
    if (nickname.trim() === '') {
      setStatus('error');
      setErrorMessage('필수 입력 사항입니다.');
      return;
    }

    if (nickname.toLowerCase() === 'user1') {
      setStatus('error');
      setErrorMessage('중복된 닉네임입니다.');
    } else {
      setStatus('success');
      setErrorMessage('사용 가능한 닉네임입니다.');
    }
  };

  const getMessageColor = () => {
    if (status === 'error') return 'text-red-200';
    if (status === 'success') return 'text-blue-300';
    if (status === 'default') return 'text-black-300';
    return 'text-black-300';
  };

  const getMessage = () => {
    if (status === 'error') return errorMessage;
    if (status === 'success') return errorMessage;
    if (status === 'default') return '';
    return '';
  };

  const handleGroupCardClick = () => {
    console.log('그룹 상세 페이지로 이동');
  };

  const handleEventCardClick = () => {
    console.log('이벤트 상세 페이지로 이동');
  };

  const handleEventListItemClick = (eventId: string) => {
    console.log('이벤트 리스트 아이템 클릭함, eventId:', eventId);
  };

  const eventListData = [
    {
      eventId: '1',
      date: '2024-05-15',
      eventName: '동산 사이드 프로젝트 쫑파티',
      startTime: '오후 17:30',
      location: '사당역 5번 출구 앞',
      isParticipating: false,
    },
    {
      eventId: '2',
      date: '2024-05-16',
      eventName: '개발팀 온라인 회의',
      startTime: '오전 11:30',
      location: '디스코드',
      isParticipating: true,
    },
    {
      eventId: '3',
      date: '2024-05-20',
      eventName: '팀 빌딩 활동',
      startTime: '오후 14:00',
      location: '강남역 근처',
      isParticipating: false,
    },
    {
      eventId: '4',
      date: '2024-05-22',
      eventName: '프로젝트 발표회',
      startTime: '오전 10:00',
      location: '회의실 A',
      isParticipating: true,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* 타이포그래피 */}
      <section className="space-y-4 p-4 border rounded bg-gray-50">
        <div className="space-y-2">
          <Title1>Title1</Title1>
          <Title2>Title2</Title2>
          <Title3>Title3</Title3>
          <Title4>Title4</Title4>

          <Headline1>Headline1</Headline1>
          <Headline2>Headline2</Headline2>

          <Body1>Body1</Body1>
          <Body2>Body2</Body2>
          <Body4>Body4</Body4>
          <Body4Emphasized>Body4Emphasized</Body4Emphasized>
          <Body3Underlined>Body3Underlined</Body3Underlined>

          <Button1>Button1</Button1>
          <Button2>Button2</Button2>
          <Button3>Button3</Button3>
        </div>
      </section>

      {/* Input */}
      <section className="space-y-4 p-4 border rounded">
        <Title1>Input 컴포넌트</Title1>
        <Input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="input 샘플 메세지를 입력하세요"
          maxLength={5}
        />
        <Input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="글자수 제한 없음"
        />
      </section>

      {/* Textarea  */}
      <section className="space-y-4 p-4 border rounded">
        <Title1>Textarea 컴포넌트</Title1>

        <div>
          <Title3>기본 Textarea</Title3>
          <Textarea
            value={text}
            onChange={setText}
            placeholder="textarea 샘플 메세지를 입력하세요"
            maxLength={20}
          />
          <Textarea value={text} onChange={setText} placeholder="글자수 제한 없음" />
        </div>

        <div>
          <Title3>여러 줄 Textarea</Title3>
          <Textarea
            value={texts}
            onChange={setTexts}
            height="120px"
            placeholder="긴 내용을 입력하세요"
          />
        </div>

        <div>
          <Title3 className="mb-1">닉네임 입력 (필수)</Title3>
          <Textarea
            value={nickname}
            onChange={val => {
              setNickname(val);
              if (status === 'error' && errorMessage === '필수 입력 사항입니다.') {
                setErrorMessage('');
                setStatus('default');
              }
            }}
            placeholder="닉네임 입력 (user1: 중복된 닉네임)"
          />

          {status !== 'default' && (
            <div className="mt-[4px]">
              <p className={`ml-[2px] font-regular text-[12px] ${getMessageColor()}`}>
                {getMessage()}
              </p>
            </div>
          )}

          <button
            onClick={handleCheck}
            className="mt-2 px-4 py-2 bg-blue-500 text-white-50 rounded"
          >
            확인
          </button>
        </div>
      </section>

      <section className="space-y-4 p-4 border rounded">
        <Title1>카드 컴포넌트</Title1>
        <GroupCard
          title="우리끼리 골프"
          description="Welcome! 골프를 사랑하고 골프를 통해 멤버들간의 정을 쌓아가고자 하는 모임"
          member={30}
          img=""
          onGroupCardClick={handleGroupCardClick}
        />
        <div className="w-[400px] mb-2">
          <EventCard
            eventId="sample-1"
            eventName="동산 사이드 프로젝트 쫑파티"
            startTime="오후 17:30"
            location="사당역 5번 출구 앞"
            isParticipating={false}
            onEventCardClick={handleEventCardClick}
          />
        </div>
      </section>

      <section className="space-y-4 p-4 border rounded w-[450px]">
        <Title1>날짜 + 이벤트 카드</Title1>
        <div className="space-y-3">
          {eventListData.map((event, index) => (
            <div key={event.eventId} className="flex gap-3 items-start relative">
              <div className="flex flex-col items-center relative pt-1">
                <DateIcon date={event.date} index={index} />
                {index < eventListData.length - 1 && (
                  <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 w-[1px] h-[40px] bg-black-200"></div>
                )}
              </div>
              <div className="flex-1">
                <EventCard
                  eventId={event.eventId}
                  eventName={event.eventName}
                  startTime={event.startTime}
                  location={event.location}
                  isParticipating={event.isParticipating}
                  onEventCardClick={() => handleEventListItemClick(event.eventId)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
