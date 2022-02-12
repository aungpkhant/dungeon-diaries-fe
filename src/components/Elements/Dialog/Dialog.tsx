import { Dialog as HuiDialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

import { Button } from '@/components/Elements';

export type DialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  title: string;
  content: string;
  ActionButton: React.ReactNode;
};

export const Dialog = ({ isOpen, closeDialog, title, content, ActionButton }: DialogProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <HuiDialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeDialog}>
          {/* Use the overlay to style a dim backdrop for your dialog */}
          <HuiDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HuiDialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="border-b pb-2">
                  <HuiDialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </HuiDialog.Title>
                </div>
                <div className="mt-3">
                  <p className="text-base text-gray-500">{content}</p>
                </div>

                <div className="mt-4 flex justify-end space-x-4">
                  <Button variant="secondary" onClick={closeDialog}>
                    Close
                  </Button>
                  {ActionButton}
                </div>
              </div>
            </Transition.Child>
          </div>
        </HuiDialog>
      </Transition>
    </>
  );
};
