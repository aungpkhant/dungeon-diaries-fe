import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';

import { Post } from '../types';

export type CreatePostDTO = {
  data: {
    title: string;
    body: string;
  };
};

export const createPost = (data: CreatePostDTO): Promise<Post> => {
  return axios.post(`/posts`, data);
};

// TODO add onMutate, onError, onSuccess
export const useCreatePost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      navigate('/app/feed');
    },
  });
};
