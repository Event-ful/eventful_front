import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  // 현재 경로가 활성 상태인지 확인하는 함수
  const isActive = (path: string) => {
    return location.pathname === `/${path}` || location.pathname === path;
  };

  return (
    <div className="px-[10px] py-[10px] flex flex-col h-[100%]">
      <div className=" flex flex-col gap-1 flex-grow-1">
        <Link
          to={'home'}
          className={`block rounded-[8px] px-3 py-[10px] text-gray-600
        ${isActive('home') ? 'bg-[#F1FDFA] text-gray-950' : 'hover:bg-[#F1FDFA]'}`}
        >
          <h2 className="font-semibold"> 홈</h2>
        </Link>
        <Link
          to={'sign_up'}
          className={`block rounded-[8px] px-3 py-[10px] text-gray-600
         ${isActive('sign_up') ? 'bg-[#F1FDFA] text-gray-950' : 'hover:bg-[#F1FDFA]'}`}
        >
          <h2 className="font-semibold"> 회원가입</h2>
        </Link>
        <Link
          to={'new_group'}
          className={`block rounded-[8px] px-3 py-[10px] text-gray-600
         ${isActive('new_group') ? 'bg-[#F1FDFA] text-gray-950' : 'hover:bg-[#F1FDFA]'}`}
        >
          <h2 className="font-semibold"> 그룹 만들기</h2>
        </Link>
        <Link
          to={'shared_components'}
          className={`block rounded-[8px] px-3 py-[10px] text-gray-600
         ${isActive('shared_components') ? 'bg-[#F1FDFA] text-gray-950' : 'hover:bg-[#F1FDFA]'}`}
        >
          <h2 className="font-semibold">샘플</h2>
        </Link>
      </div>
      <div className="border-t border-gray-200 p-4 mt-auto">
        <div className="space-y-3">
          {/* 서비스 정보 */}
          <div>
            <p className="text-xs text-gray-600 mb-1">Eventful 소개</p>
            <div className="y-center gap-1">
              <Link to="/terms" className="block text-xs text-gray-600 hover:text-gray-800 hover:underline">
                이용약관 ·
              </Link>
              <Link to="/privacy" className="block text-xs text-gray-600 hover:text-gray-800 hover:underline">
                개인정보처리방침
              </Link>
            </div>
          </div>

          {/* 저작권 정보 */}
          <div className="">
            <p className="text-xs text-gray-500">© 2025 Eventful</p>
          </div>
        </div>
      </div>
    </div>
  );
}
