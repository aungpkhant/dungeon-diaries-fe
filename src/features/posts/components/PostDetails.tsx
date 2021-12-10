import { Post } from './Post';
import { Spinner } from '@/components/Elements';
import { usePost } from '../api/getPost';
import { CommentForm, CommentsList } from '@/features/comments';

export const PostDetails = ({ postId }: { postId: string }) => {
  const { data, error, isLoading, isIdle, isError } = usePost(postId);

  if (isLoading || isIdle) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full h-48 flex justify-center items-center text-gray-500 font-medium">
        -- It's a dead end --
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Post key={data.id} {...data} isClickableLink={false} />
      <CommentForm />
      <CommentsList />
    </div>
  );
};
