import { Post } from './Post';
import { Spinner, DeadEnd } from '@/components/Elements';
import { usePost } from '../api/getPost';
import { CommentForm, CommentsList } from '@/features/comments';

export const PostDetails = ({ postId }: { postId: string }) => {
  const { data, isLoading, isIdle, isError } = usePost(postId);

  if (isLoading || isIdle) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !data) {
    return <DeadEnd />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Post key={data.id} {...data} isClickableLink={false} />
      <CommentForm />
      <CommentsList />
    </div>
  );
};
