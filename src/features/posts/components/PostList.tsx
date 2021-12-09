import { Post } from './Post';
import { Spinner } from '@/components/Elements';
import { usePosts } from '../api/getPosts';

export const PostList = () => {
  const { data, isLoading, isIdle } = usePosts();

  if (isLoading || isIdle) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data?.posts?.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full h-48 flex justify-center items-center text-gray-500 font-medium">
        -- Much Empty --
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {data?.posts?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};
