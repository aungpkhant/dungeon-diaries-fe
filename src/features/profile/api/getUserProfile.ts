import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { AuthUser } from '@/features/auth';

export const getUserProfile = (userId: string): Promise<AuthUser> => {
  return axios.get(`/users/profile/${userId}`);
};

export const useUserProfile = (userId: string) => {
  return useQuery(['profile', userId], () => getUserProfile(userId));
};
