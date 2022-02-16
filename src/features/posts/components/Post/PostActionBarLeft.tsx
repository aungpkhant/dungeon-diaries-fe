import { ChatAltIcon, ArrowCircleUpIcon, ArrowCircleDownIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

import { Button } from '@/components/Elements';
import { TPost } from '../..';
import { useVotePost } from '../../api/votePost';

const upvoteButtonVariant = {
  '0': 'text-gray-400 hover:text-green-300',
  '-1': 'text-gray-400 hover:text-green-300',
  '1': 'text-green-400 hover:text-green-300',
};

const downvoteButtonVariant = {
  '0': 'text-gray-400 hover:text-red-400',
  '-1': 'text-red-500 hover:text-red-400',
  '1': 'text-gray-400 hover:text-red-400',
};

export const PostActionBarLeft = ({
  id,
  user_vote,
  votes,
  comment_count,
}: Pick<TPost, 'id' | 'user_vote' | 'votes' | 'comment_count'>) => {
  const { mutate, isLoading } = useVotePost();

  const handleVote = (vote_value: TPost['user_vote']) => {
    if (vote_value === user_vote) {
      mutate({
        vote: 0,
        postId: id,
      });
    } else {
      mutate({
        vote: vote_value,
        postId: id,
      });
    }
  };

  return (
    <div className="flex space-x-4">
      <span className="inline-flex items-center text-sm">
        <Button
          variant="custom"
          size="custom"
          startIcon={<ArrowCircleUpIcon className="h-5 w-5" aria-hidden="true" />}
          className={clsx('py-2', upvoteButtonVariant[`${user_vote}`])}
          isLoading={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            handleVote(1);
          }}
        ></Button>
        <span className="font-retro font-semibold text-gray-900">{votes}</span>
        <Button
          variant="custom"
          size="custom"
          endIcon={<ArrowCircleDownIcon className="h-5 w-5" aria-hidden="true" />}
          className={clsx('py-2', downvoteButtonVariant[`${user_vote}`])}
          isLoading={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            handleVote(-1);
          }}
        ></Button>
      </span>
      <span className="inline-flex items-center text-sm">
        <Button variant="ghost" startIcon={<ChatAltIcon className="h-5 w-5" aria-hidden="true" />}>
          {comment_count}
        </Button>
      </span>
    </div>
  );
};
