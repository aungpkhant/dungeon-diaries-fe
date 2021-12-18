import { axios } from '@/lib/axios';

import { AuthUser } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentialsDTO): Promise<AuthUser> => {
  return axios.post('/auth/register', data);
};
