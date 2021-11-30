import { useRoutes } from 'react-router';

import { useAuth } from '@/hooks/useAuth/useAuth';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';
import { Landing } from '@/features/misc/routes';

export const AppRoutes = () => {
  const { user } = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
