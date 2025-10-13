import { SignupPage, SharedPage } from '@/pages/auth';
import { HomePage } from '@/pages/home';
import Layout from './layout';

export const routes = [
  {
    element: <Layout isSidebar={true} />,
    path: '/',
    children: [
      {
        element: <HomePage />,
        path: 'home',
      },
      {
        element: <SharedPage />,
        path: 'shared_components',
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
