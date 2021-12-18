import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { GetPosts } from '../types';

export const getPosts = (): Promise<GetPosts> => {
  return axios.get('/posts');
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};
