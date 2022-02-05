import clsx from 'clsx';
import { ClipboardIcon, ClipboardCheckIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router';
import { SRLWrapper } from 'simple-react-lightbox';
import useClipboard from 'react-use-clipboard';

import { TPost } from '../../types';
import { Button } from '@/components/Elements';
import { PostAuthorMetaData } from './PostAuthorMetaData';
import { PostActionBarLeft } from './PostActionBarLeft';
import React from 'react';

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
  author_profile_image,
  isClickableLink = true,
}: PostProps) => {
  const navigate = useNavigate();
  const [isCopied, setCopied] = useClipboard(`${window.location.origin}/app/posts/${id}`, {
    successDuration: 2000,
  });

  const handleClick = isClickableLink
    ? () => {
        navigate(`/app/posts/${id}`);
      }
    : // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {};

  const handleShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCopied();
  };

  return (
    <article
      className={clsx('bg-white shadow sm:rounded-lg p-6', isClickableLink ? 'cursor-pointer' : '')}
      onClick={handleClick}
    >
      <div>
        <PostAuthorMetaData
          author={author}
          author_id={author_id}
          author_profile_image={author_profile_image}
          created_at={created_at}
        />
        <h3 className="mt-4 text-lg font-medium text-gray-900 break-all">{title}</h3>
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
      <div className="mt-2 space-y-4">
        <p className="text-gray-600 text-md whitespace-pre-wrap break-all">{content}</p>
      </div>
      <div className="mt-6 flex justify-between">
        <PostActionBarLeft
          id={id}
          user_vote={user_vote}
          votes={votes}
          comment_count={comment_count}
        />
        <div className="flex text-sm">
          <Button
            variant="custom"
            className={clsx(
              isCopied
                ? 'hover:text-green-600 text-green-500'
                : 'text-gray-400 hover:text-indigo-500'
            )}
            startIcon={
              isCopied ? (
                <ClipboardCheckIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
              )
            }
            onClick={handleShareClick}
          >
            {isCopied ? 'Copied' : 'Share'}
          </Button>
        </div>
      </div>
    </article>
  );
};
