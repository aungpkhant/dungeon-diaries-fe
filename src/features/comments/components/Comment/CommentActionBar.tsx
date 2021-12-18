import { Button } from '@/components/Elements';
import { ChatAltIcon } from '@heroicons/react/outline';

export const CommentActionBar = () => {
  return (
    <div className="my-4">
      <Button
        variant="custom"
        size="custom"
        className="text-gray-500 py-1 px-2 text-md rounded-md hover:bg-gray-300"
        startIcon={<ChatAltIcon className="h-4 w-4" />}
      >
        Reply
      </Button>
    </div>
  );
};
