import { Fragment } from 'react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { useToggle } from '@/hooks/useToggle';
import { useDeleteComment } from '../../api/deleteComment';
import { Button, Dialog } from '@/components/Elements';

export const CommentKebabMenu = ({ commentId }: { commentId: number }) => {
  const {
    isOpen: commentDeleteDialogIsOpen,
    open: openCommentDeleteDialog,
    close: closeCommentDeleteDialog,
  } = useToggle(false);

  const { isLoading, mutate } = useDeleteComment();

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-75"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'flex px-4 py-2 text-sm w-full'
                    )}
                    onClick={openCommentDeleteDialog}
                  >
                    <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Delete comment</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {commentDeleteDialogIsOpen && (
        <Dialog
          isOpen={commentDeleteDialogIsOpen}
          closeDialog={closeCommentDeleteDialog}
          title={'Delete comment'}
          content={'Are you sure you want to delete your comment?'}
          ActionButton={
            <Button
              variant="danger"
              isLoading={isLoading}
              onClick={() => mutate({ commentId }, { onSuccess: closeCommentDeleteDialog })}
            >
              Delete
            </Button>
          }
        />
      )}
    </>
  );
};
