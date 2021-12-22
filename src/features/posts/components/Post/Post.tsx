import clsx from 'clsx';
import { ShareIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router';
import { SRLWrapper } from 'simple-react-lightbox';

import { TPost } from '../../types';
import { Button } from '@/components/Elements';
import { PostAuthorMetaData } from './PostAuthorMetaData';
import { PostActionBarLeft } from './PostActionBarLeft';

type PostProps = TPost & {
  isClickableLink?: boolean;
};

export const Post = ({
  author,
  id,
  author_id,
  title,
  content,
  image,
  votes,
  created_at,
  updated_at,
  user_vote,
  comment_count,
  isClickableLink = true,
}: PostProps) => {
  const navigate = useNavigate();

  const handleClick = isClickableLink
    ? () => {
        navigate(`/app/posts/${id}`);
      }
    : // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {};

  return (
    <article
      className={clsx('bg-white shadow sm:rounded-lg p-6', isClickableLink ? 'cursor-pointer' : '')}
      onClick={handleClick}
    >
      <div>
        <PostAuthorMetaData author={author} created_at={created_at} />
        <h2 className="mt-4 text-lg font-medium text-gray-900">{title}</h2>
      </div>
      {Boolean(image) && (
        <SRLWrapper>
          <div className="-mx-6 my-4 flex justify-center">
            <img
              className="max-w-full cursor-pointer"
              style={{
                maxHeight: '512px',
              }}
              src={image}
              alt=""
              onClick={(e) => e?.stopPropagation()}
            />
          </div>
        </SRLWrapper>
      )}
      <div className="mt-2 text-md text-gray-600 space-y-4">{content}</div>
      <div className="mt-6 flex justify-between">
        <PostActionBarLeft
          id={id}
          user_vote={user_vote}
          votes={votes}
          comment_count={comment_count}
        />
        <div className="flex text-sm">
          <Button variant="ghost" startIcon={<ShareIcon className="h-5 w-5" aria-hidden="true" />}>
            Share
          </Button>
        </div>
      </div>
    </article>
  );
};
