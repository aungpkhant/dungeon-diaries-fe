import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { TCommentNested } from '../../types';
import { formatDateTimeRelative } from '@/lib/dayjs';
import { useToggle } from '@/hooks/useToggle';
import { POLICIES, Authorization } from '@/lib/authorization';
import { useAuth } from '@/hooks/useAuth';
import { CommentForm } from '..';
import { CommentActionBar } from './CommentActionBar';
import { CommentKebabMenu } from './CommentKebabMenu';
import { AuthUser } from '@/features/auth';
import { Badge } from '@/components/Elements';

type CommentProps = {
  comment: TCommentNested;
};

export const Comment = ({ comment }: CommentProps) => {
  const { user } = useAuth();
  const { isOpen: isReplying, toggle: toggleReplying, close: closeReplyTextBox } = useToggle(false);

  const NestedComments = (comment.child_comments || []).map((child) => {
    return <Comment key={child.id} comment={child} />;
  });

  return (
    <div className="text-gray-500">
      <div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"
              src={comment.author_profile_image ?? '/assets/default_profile.png'}
            />
          </div>
          <div className="flex-1 ml-3">
            <div className="font-medium text-gray-900">
              <Link to={`/app/profile/${comment.author_id}`} className="hover:underline">
                {comment.author}
              </Link>
              <Authorization policyCheck={POLICIES['owner'](user, comment.author_id)}>
                <span className="ml-3">
                  <Badge>Me</Badge>
                </span>
              </Authorization>
            </div>
            <div>{formatDateTimeRelative(comment.created_at)}</div>
          </div>
          <Authorization policyCheck={POLICIES['comment:delete'](user as AuthUser, comment)}>
            <div className="flex-shrink-0 self-center flex">
              <CommentKebabMenu commentId={comment.id} />
            </div>
          </Authorization>
        </div>
      </div>
      <div className="pl-10 relative">
        <span className="absolute left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
        <div className=" mb-4 mt-2 ml-3">
          <p className={clsx('text-gray-700 break-all', comment.deleted_at && 'italic')}>
            {comment.content}
          </p>
          <CommentActionBar handleReplyButtonClick={toggleReplying} />
          {isReplying && (
            <CommentForm parentCommentId={comment.id} closeReplyTextBox={closeReplyTextBox} />
          )}
        </div>
        {NestedComments}
      </div>
    </div>
  );
};
