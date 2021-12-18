import { Spinner } from '@/components/Elements';
import { useComments } from '../api/getComments';
import { useParams } from 'react-router';
import { Comment } from './Comment';

export const CommentsList = () => {
  const { postId = '' } = useParams();
  const { data, isLoading, isIdle } = useComments(postId);

  if (isLoading || isIdle) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full h-48 flex justify-center items-center text-gray-500 font-medium">
        -- No Comments --
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 sm:px-0">
      {data.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
