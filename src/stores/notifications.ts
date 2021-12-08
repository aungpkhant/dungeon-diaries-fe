import { nanoid } from 'nanoid';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export type TNotification = {
  id: string;
  type: 'success' | 'error';
  title: string;
  message?: string;
};

type NotificationStore = {
  notifications: TNotification[];
  addNotifcation: (notification: Omit<TNotification, 'id'>) => void;
  dismissNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationStore>(
  devtools((set) => ({
    notifications: [],
    addNotifcation: (notification) =>
      set((state) => ({
        notifications: [...state.notifications, { id: nanoid(), ...notification }],
      })),
    dismissNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((notification) => notification.id !== id),
      })),
  }))
);
