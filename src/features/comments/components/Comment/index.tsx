import { TCommentNested } from '../../types';
import { formatDateTimeRelative } from '@/lib/dayjs';
import { CommentActionBar } from './CommentActionBar';

export const Comment = ({ comment }: { comment: TCommentNested }) => {
  const NestedComments = (comment.child_comments || []).map((child) => {
    return <Comment key={child.id} comment={child} />;
  });

  return (
    <div className="text-gray-500">
      <div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center"
              src={
                'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
              }
            />
          </div>
          <div className="flex-1 ml-3">
            <div className="font-medium text-gray-900">{comment.author}</div>
            <div>{formatDateTimeRelative(comment.created_at)}</div>
          </div>
        </div>
      </div>
      <div className="pl-10 relative">
        <span className="absolute left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
        <div className=" mb-4 mt-2 ml-3">
          <p className="text-gray-700">{comment.content}</p>
          <CommentActionBar />
        </div>
        {NestedComments}
      </div>
    </div>
  );
};
