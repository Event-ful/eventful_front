import EventFulLogo from '@/shared/ui/eventFulLogo';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

export default function Layout() {
  return (
    <div>
      <div className="flex justify-between h-[50px] border-b border-gray-300 px-6">
        <EventFulLogo />
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium bg-[#009689] text-white px-4 py-1 rounded-[8px]">낙현</span>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[240px] h-[calc(100vh-50px)] border-r border-gray-300">
          <Sidebar />
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
