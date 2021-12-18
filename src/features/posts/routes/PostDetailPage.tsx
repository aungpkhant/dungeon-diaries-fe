import { useParams } from 'react-router-dom';

import { Heading } from '@/components/Elements';
import { PostDetails } from '../components';

export function PostDetailPage() {
  const { postId = '' } = useParams();

  return (
    <>
      <Heading className="mb-4">Post Detail</Heading>
      <div className="space-y-4 sm:space-y-6">
        <PostDetails postId={postId} />
      </div>
    </>
  );
}
