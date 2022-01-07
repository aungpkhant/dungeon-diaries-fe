import { Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { Feed, NewPost, PostDetailPage } from '@/features/posts';
import { Profile } from '@/features/profile/routes';
import { DeadEnd } from '@/components/Elements';

// TODO add suspense
const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const AppWithoutRightAside = () => {
  return (
    <MainLayout AsideRight={null}>
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
      { path: 'posts/:postId', element: <PostDetailPage /> },
    ],
  },
  {
    path: '/app',
    element: <AppWithoutRightAside />,
    children: [{ path: 'profile/:userId', element: <Profile /> }],
  },
  {
    path: '/*',
    element: <App />,
    children: [{ path: '*', element: <DeadEnd /> }],
  },
];
