import { TNotification } from '@/stores/notifications';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { Fragment } from 'react';

const variants = {
  success: 'text-green-800 bg-green-50',
  error: 'text-red-800 bg-red-50',
};

const icons = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />,
  error: <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />,
};

type NotificationProps = {
  notification: TNotification;
  onDismiss: (id: string) => void;
};

export const Notification = ({ notification, onDismiss }: NotificationProps) => {
  return (
    <div className="w-full flex flex-col items-center sm:items-end">
      <Transition
        show={true}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden">
          <div className={clsx('p-4', variants[notification.type])}>
            <div className="flex">
              <div className="flex-shrink-0">{icons[notification.type]}</div>
              <div className="w-0 flex-1 ml-3 space-y-2">
                <p className="text-md font-medium ">{notification.title}</p>
                {Boolean(notification.message) && <p className="text-sm">{notification.message}</p>}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="rounded-md inline-flex text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={() => {
                    onDismiss(notification.id);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};
