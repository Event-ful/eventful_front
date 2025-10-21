import EventFulLogo from '@/shared/ui/eventFulLogo';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import { Button2 } from '@/shared/ui/typography';
import LoginForm from '@/features/auth/login/ui/LoginForm';
import { useState } from 'react';

interface LayoutProps {
  isSidebar: boolean;
}
export default function Layout({ isSidebar }: LayoutProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between h-[50px] border-b border-gray-300 px-6">
        <EventFulLogo />
        <div className="y-center space-x-3" onClick={() => setIsLoginOpen(true)}>
          <Button2 className="bg-green-400 text-white-50 px-4 py-1 rounded-[8px] cursor-pointer">
            로그인
          </Button2>
        </div>
      </div>
      {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} />}

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
