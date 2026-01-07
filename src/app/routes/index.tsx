import { SharedPage, SignupPage } from '@/pages/auth';
import { HomePage } from '@/pages/home';
import Layout from './layout';
import NewGroup from '@/pages/group/ui/NewGroup.page';
import GroupDetailPage from '@/pages/group/ui/Detail.page';

export const routes = [
  {
    element: <Layout isSidebar={true} />,
    path: '/',
    children: [
      {
        element: <HomePage />,
        path: '',
      },
      {
        element: <SharedPage />,
        path: 'shared_components',
      },
      {
        element: <NewGroup />,
        path: 'new_group',
      },
      {
        element: <GroupDetailPage />,
        path: 'group/:id',
      },
    ],
  },
  {
    element: <Layout isSidebar={false} />,
    path: '/',
    children: [
      {
        element: <SignupPage />,
        path: 'sign_up',
      },
    ],
  },
];
