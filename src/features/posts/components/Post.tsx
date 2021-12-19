import React, { Children } from 'react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import { useNavigate } from 'react-router';
import { SRLWrapper } from 'simple-react-lightbox';

import { TPost } from '../types';
import { formatDateTimeRelative } from '@/lib/dayjs';

const question = {
  id: '81614',
  likes: '0',
  replies: '0',
  views: '2.7k',
  author: {
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  date: 'December 9 at 11:43 AM',
  datetime: '2020-12-09T11:43:00',
  href: '#',
};

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
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={question.author.imageUrl} alt="" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              <a href={question.author.href} className="hover:underline">
                {author}
              </a>
            </p>
            <p className="text-sm text-gray-500">
              <time dateTime={created_at}>{formatDateTimeRelative(created_at)}</time>
            </p>
          </div>
          {/* <div className="flex-shrink-0 self-center flex">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex px-4 py-2 text-sm'
                            )}
                          >
                            <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Add to favorites</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex px-4 py-2 text-sm'
                            )}
                          >
                            <CodeIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Embed</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex px-4 py-2 text-sm'
                            )}
                          >
                            <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Report content</span>
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div> */}
        </div>
        <h2 id={'question-title-' + question.id} className="mt-4 text-lg font-medium text-gray-900">
          {title}
        </h2>
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
      <div className="mt-6 flex justify-between space-x-8">
        <div className="flex space-x-6">
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">{votes}</span>
              <span className="sr-only">likes</span>
            </button>
          </span>
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">{comment_count}</span>
              <span className="sr-only">comments</span>
            </button>
          </span>
        </div>
        <div className="flex text-sm">
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <ShareIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">Share</span>
            </button>
          </span>
        </div>
      </div>
    </article>
  );
};
