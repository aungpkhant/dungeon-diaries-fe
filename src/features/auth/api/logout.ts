import { axios } from '@/lib/axios';

export const logout = () => {
  return axios.post('/auth/logout');
};
