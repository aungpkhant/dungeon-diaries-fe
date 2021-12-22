import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '@/lib/react-query';

import { GetPosts, TPost, VotePost } from '../types';
import { useNotificationStore } from '@/stores/notifications';

type VotePostDTO = {
  vote: TPost['user_vote'];
  postId: number;
};

export const votePost = (data: VotePostDTO): Promise<VotePost> => {
  return axios.post(`/posts/vote/${data.postId}`, { vote: data.vote });
};

export const useVotePost = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: votePost,
    onSuccess: (data) => {
      // Just update frontend caches instead of refetch
      queryClient.setQueryData<GetPosts | undefined>('posts', (cachedPostsData) => {
        if (cachedPostsData === undefined) {
          return undefined;
        }

        return {
          posts: cachedPostsData?.posts?.map((post) => {
            if (post.id === data.post_id) {
              return { ...post, votes: data.votes, user_vote: data.user_vote };
            }
            return post;
          }),
        };
      });

      queryClient.setQueryData<TPost | undefined>(['post', `${data.post_id}`], (cachedPost) => {
        if (cachedPost === undefined) {
          return undefined;
        }

        return {
          ...cachedPost,
          votes: data.votes,
          user_vote: data.user_vote,
        };
      });

      addNotification({
        type: 'success',
        title: 'Thanks for your opinion',
      });
    },
  });
};
