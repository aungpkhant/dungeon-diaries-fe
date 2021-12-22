import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '@/lib/react-query';

import { useNotificationStore } from '@/stores/notifications';
import { TComment } from '../types';
import { TPost } from '@/features/posts';

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
    onSuccess: (_, { postId }) => {
      addNotification({
        type: 'success',
        title: 'Comment created',
      });

      queryClient.setQueryData<TPost | undefined>(['post', postId], (cachedPost) => {
        console.log(cachedPost);
        if (cachedPost === undefined) {
          return undefined;
        }

        return {
          ...cachedPost,
          comment_count: `${parseInt(cachedPost.comment_count, 10) + 1}`,
        };
      });

      queryClient.invalidateQueries('comments');
    },
  });
};
