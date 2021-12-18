import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '@/lib/react-query';

import { useNotificationStore } from '@/stores/notifications';
import { TComment } from '../types';

export type CreateCommentDTO = {
  postId: string;
  data: {
    content: string;
    parentCommentId: number | null;
  };
};

export const createComment = ({ postId, data }: CreateCommentDTO): Promise<TComment> => {
  return axios.post(`/comments/${postId}`, data);
};

// Could use some improvements like optimistic updates here
export const useCreateComment = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Comment created',
      });
      // TODO could do better here and invalidate comments specific for the post
      queryClient.invalidateQueries('comments');
    },
  });
};
