import EventFulLogo from '@/shared/ui/eventFulLogo';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

interface LayoutProps {
  isSidebar: boolean;
}
export default function Layout({ isSidebar }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between h-[50px] border-b border-gray-300 px-6">
        <div className="cursor-pointer" onClick={() => navigate('/home')}>
          <EventFulLogo />
        </div>
        <div className="y-center space-x-3">
          <span className="text-sm font-medium bg-[#009689] text-white px-4 py-1 rounded-[8px]">
            낙현
          </span>
        </div>
      </div>

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
