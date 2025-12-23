import { Input } from '@/shared/ui/input';
import { Headline1, Headline2 } from '@/shared/ui/typography';
import useCreateEvent from '../model';
import { Textarea } from '@/shared/ui/textarea';
import { DatePicker } from '@/shared/ui/datePicker';
import { LocationSearch } from '@/shared/ui/locationSearch';

export default function CreateEventForm() {
  const {
    eventName,
    setEventName,
    description,
    setDescription,
    personnel,
    setPersonnel,
    date,
    setDate,
    location,
    setLocation,
    submitNewEvent,
  } = useCreateEvent();

  return (
    <div className="p-6">
      <Headline1 className="text-2xl font-bold mb-8">이벤트 만들기</Headline1>

      <form className="space-y-6" onSubmit={submitNewEvent}>
        {/* 이벤트 이름 */}
        <div>
          <Headline2 className="mb-2 text-sm font-medium">
            이벤트 이름 <span className="text-red-500">*</span>
          </Headline2>
          <Input
            type="text"
            placeholder="이벤트 이름을 입력하세요"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
            maxLength={20}
          />
          <div className="text-right text-xs text-black-300 mt-1">{eventName.length} / 20</div>
        </div>

        {/* 이벤트 소개 */}
        <div>
          <Headline2 className="mb-2 text-sm font-medium">
            이벤트 소개 <span className="text-red-500">*</span>
          </Headline2>
          <Textarea
            placeholder="이벤트의 대략 2~3줄의 설명을 작성해주세요."
            value={description}
            onChange={value => setDescription(value)}
            height="100px"
            maxLength={100}
          />
        </div>

        {/* 인원과 날짜 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 인원 */}
          <div>
            <Headline2 className="mb-2 text-sm font-medium">
              인원 <span className="text-red-500">*</span>
            </Headline2>
            <Input
              type="number"
              placeholder="0"
              value={personnel}
              onChange={e => {
                const value = e.target.value;
                if (value === '' || /^\d+$/.test(value)) {
                  setPersonnel(value);
                }
              }}
            />
          </div>

          {/* 날짜 */}
          <div>
            <Headline2 className="mb-2 text-sm font-medium">
              날짜 <span className="text-red-500">*</span>
            </Headline2>
            <DatePicker value={date} onChange={setDate} placeholder="month/yy" />
          </div>
        </div>

        {/* 장소 */}
        <div>
          <Headline2 className="mb-2 text-sm font-medium">장소</Headline2>
          <LocationSearch
            value={location?.placeName || ''}
            onChange={setLocation}
            placeholder="장소를 입력하세요"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-8"
        >
          이벤트 만들기
        </button>
      </form>
      <div id="map"></div>
    </div>
  );
}
