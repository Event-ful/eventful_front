import EventFulLogo from '@/shared/ui/eventFulLogo';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import { Button2 } from '@/shared/ui/typography';
import LoginForm from '@/features/auth/login/ui/LoginForm';
import { useState } from 'react';
import { useLogout } from '@/features/auth/login/model/queries';

interface LayoutProps {
  isSidebar: boolean;
}

export default function Layout({ isSidebar }: LayoutProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        console.log('로그인상태', isLoggedIn);
        setIsLoggedIn(false);
        console.log('로그아웃 완료');
        alert('로그아웃 되었습니다.');
      },
      onError: err => {
        console.log('로그인상태', isLoggedIn);
        console.error('로그아웃 에러:', err);
        alert('로그아웃 실패');
      },
    });
  };
  return (
    <div>
      <div className="flex justify-between h-[50px] border-b border-gray-300 px-6">
        <EventFulLogo />
        <div className="y-center space-x-3">
          {isLoggedIn ? (
            <div
              onClick={() => {
                handleLogout();
                setIsLoggedIn(false);
              }}
            >
              <Button2 className="bg-green-400 text-white-50 px-4 py-1 rounded-[8px] cursor-pointer hover:bg-green-500">
                로그아웃
              </Button2>
            </div>
          ) : (
            <div onClick={() => setIsLoginOpen(true)}>
              <Button2 className="bg-green-400 text-white-50 px-4 py-1 rounded-[8px] cursor-pointer hover:bg-green-500">
                로그인
              </Button2>
            </div>
          )}
        </div>
      </div>

      {isLoginOpen && (
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      )}

      <div className="flex">
        {isSidebar && (
          <div className="w-[240px] h-[calc(100vh-50px)] border-r border-gray-300">
            <Sidebar />
          </div>
        )}

        <div className="content flex-1 h-[calc(100vh-50px)] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
