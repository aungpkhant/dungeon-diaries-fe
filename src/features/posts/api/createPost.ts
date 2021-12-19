import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';

import { TPost } from '../types';
import { useNotificationStore } from '@/stores/notifications';

export type CreatePostDTO = {
  data: {
    title: string;
    content: string;
    key?: string;
    location?: string;
  };
};

export const createPost = (data: CreatePostDTO): Promise<TPost> => {
  return axios.post(`/posts`, data);
};

// TODO add onMutate, onError, onSuccess
export const useCreatePost = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      navigate('/app/feed');
      addNotification({
        type: 'success',
        title: 'Post created',
      });
    },
  });
};
