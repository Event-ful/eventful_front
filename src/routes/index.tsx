import SignUp from '@/pages/signUp.page';
import Home from '../pages/home.page';
import Layout from './layout';
import SharedComponents from '../pages/shared.page';
import NewGroup from '@/pages/newGroup.page';

export const routes = [
  {
    element: <Layout isSidebar={true} />,
    path: '/',
    children: [
      {
        element: <Home />,
        path: 'home',
      },
      {
        element: <SharedComponents />,
        path: 'shared_components',
      },
      {
        element: <NewGroup />,
        path: 'new_group',
      },
    ],
  },
  {
    element: <Layout isSidebar={false} />,
    path: '/',
    children: [
      {
        element: <SignUp />,
        path: 'sign_up',
      },
    ],
  },
];
