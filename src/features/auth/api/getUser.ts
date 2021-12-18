import { axiosWithoutIntercept } from '@/lib/axios';

import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => {
  return axiosWithoutIntercept.get('/users/me');
};
