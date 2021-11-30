import { Post } from './Post';
import { Spinner } from '@/components/Elements';
import { usePosts } from '../api/getPost';

export const PostList = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full h-48 flex justify-center items-center text-gray-500 font-medium">
        -- Much Empty --
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
};
