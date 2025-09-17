import SignUp from '@/pages/signUp.page';
import Home from '../pages/home.page';
import Layout from './layout';
import SharedComponents from '../pages/shared.page';

export const routes = [
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        element: <Home />,
        path: 'home',
      },
      {
        element: <SignUp />,
        path: 'sign_up',
      },
      {
        element: <SharedComponents />,
        path: 'shared_components',
      },
    ],
  },
];
