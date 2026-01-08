import EventFulLogo from '@/shared/ui/eventFulLogo';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import { Button2 } from '@/shared/ui/typography';
import LoginForm from '@/features/auth/login/ui/LoginForm';
import { useState } from 'react';
import { useLogout } from '@/features/auth/login/model/queries';

interface LayoutProps {
  isSidebar: boolean;
}

export default function Layout({ isSidebar }: LayoutProps) {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { mutate: logout, isPending: isLogoutLoading } = useLogout();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout(undefined, {
        onSuccess: () => {
          setIsLoggedIn(false);
          alert('로그아웃 되었습니다.');
        },
        onError: (err: Error) => {
          console.error('로그아웃 에러:', err);
          alert('로그아웃 처리 중 오류가 발생했습니다.');
        },
      });
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between h-[50px] border-b border-gray-300 px-6">
        <div className="cursor-pointer flex" onClick={() => navigate('/home')}>
          <EventFulLogo />
        </div>
        <div className="y-center space-x-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              disabled={isLogoutLoading}
              className={`${isLogoutLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Button2 className="bg-green-400 text-white-50 px-4 py-1 rounded-[8px] cursor-pointer hover:bg-green-500">
                {isLogoutLoading ? '로그아웃 중...' : '로그아웃'}
              </Button2>
            </button>
          ) : (
            <button onClick={() => setIsLoginOpen(true)}>
              <Button2 className="bg-green-400 text-white-50 px-4 py-1 rounded-[8px] cursor-pointer hover:bg-green-500">
                로그인
              </Button2>
            </button>
          )}
        </div>
      </div>

      {isLoginOpen && (
        <LoginForm onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
      )}

      <div className="flex">
        {isSidebar && (
          <div className="w-[240px] h-[calc(100vh-50px)] border-r border-gray-300">
            <Sidebar />
          </div>
        )}

        <div className="content flex-1 h-[calc(100vh-50px)] overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
