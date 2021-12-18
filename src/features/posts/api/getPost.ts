import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { GetPost } from '../types';

export const getPostById = (id: string): Promise<GetPost> => {
  return axios.get(`/posts/${id}`);
};

export const usePost = (postId: string) => {
  return useQuery(['post', postId], () => getPostById(postId));
};
