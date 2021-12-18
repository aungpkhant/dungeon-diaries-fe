import { axios } from '@/lib/axios';

import { AuthUser } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<AuthUser> => {
  return axios.post('/auth/login', data);
};
