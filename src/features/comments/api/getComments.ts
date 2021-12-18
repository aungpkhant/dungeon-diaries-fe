import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { GetComments } from '../types';

export const getComments = (postId: string): Promise<GetComments> => {
  return axios.get(`/comments/${postId}`);
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', { postId }],
    queryFn: () => getComments(postId),
  });
};
