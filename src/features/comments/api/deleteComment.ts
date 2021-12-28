import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '@/lib/react-query';

import { useNotificationStore } from '@/stores/notifications';

export type DeleteCommentDTO = {
  commentId: number;
};

export const deleteComment = ({ commentId }: DeleteCommentDTO): Promise<unknown> => {
  return axios.delete(`/comments/${commentId}`);
};

export const useDeleteComment = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, { commentId }) => {
      addNotification({
        type: 'success',
        title: 'Comment deleted',
      });

      queryClient.invalidateQueries('comments');
    },
  });
};
