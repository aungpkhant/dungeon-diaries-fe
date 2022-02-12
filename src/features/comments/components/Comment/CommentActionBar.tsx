import { Button } from '@/components/Elements';
import { ChatAltIcon } from '@heroicons/react/outline';

type CommentActionBarProps = {
  handleReplyButtonClick: () => void;
};

export const CommentActionBar = ({ handleReplyButtonClick }: CommentActionBarProps) => {
  return (
    <div className="my-4">
      <Button
        variant="secondary"
        size="sm"
        startIcon={<ChatAltIcon className="h-4 w-4" />}
        onClick={handleReplyButtonClick}
      >
        Reply
      </Button>
    </div>
  );
};
