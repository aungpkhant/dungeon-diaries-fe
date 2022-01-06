import { axios } from '@/lib/axios';

import { AuthUser } from '@/features/auth';

export type UpdateProfileDTO = {
  bio: string;
};

export const updateProfile = (): Promise<AuthUser> => {
  return axios.put('/users/me');
};
