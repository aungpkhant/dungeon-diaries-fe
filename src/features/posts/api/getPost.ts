import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { Post } from '../types';

export const getPosts = (): Promise<Post[]> => {
  return axios.get('/posts');
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};
