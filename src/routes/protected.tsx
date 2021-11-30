import { Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { Feed, NewPost } from '@/features/posts';

// TODO add suspense
const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'feed', element: <Feed /> },
      { path: 'new-post', element: <NewPost /> },
    ],
  },
];
