import { Title1, Title3 } from '@/shared/ui/Typography';

export default function HomeBanner() {
  return (
    <div className="relative bg-slate-800 overflow-hidden">
      {/* 배경 장식 원형 요소들 */}
      <div className="absolute z-9 top-0 right-80 w-40 h-40 bg-green-300 rounded-full translate-x-8"></div>
      <div className="absolute z-10 top-24 right-80 w-40 h-40 bg-teal-600 rounded-full"></div>

      <div className="relative z-10 px-9 py-[30px] h-[183px]">
        <div className="">
          {/* 상단 네비게이션 */}
          <div className="flex justify-between items-center mb-8">
            <button className="border bg-white-50 border-white/20 text-black-400 hover:bg-white/20 backdrop-blur-sm px-[10px] py-[7px] rounded-[10px] transition-all duration-300">
              <Title3>안내사항</Title3>
            </button>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="text-white-50">
            <Title1 className="mb-2">일정 관리 서비스, Eventful</Title1>
            <Title1>이벤트풀로 함께 일정을 관리해보세요~</Title1>
          </div>
        </div>
      </div>
    </div>
  );
}
