import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '@/lib/react-query';

import { useNotificationStore } from '@/stores/notifications';
import { AuthUser } from '@/features/auth';

export type UpdateProfileDTO = {
  bio: string;
};

export const updateProfile = (data: UpdateProfileDTO): Promise<AuthUser> => {
  return axios.put('/users/me', data);
};

export const useUpdateProfile = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      addNotification({
        type: 'success',
        title: 'Profile updated',
      });

      // TODO Update frontend caches
      queryClient.setQueryData<AuthUser | undefined>(['profile', `${data.id}`], (cachedProfile) => {
        if (cachedProfile === undefined) {
          return undefined;
        }
        return data;
      });
    },
  });
};
