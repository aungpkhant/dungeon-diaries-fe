import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { queryClient } from '@/lib/react-query';

import { useNotificationStore } from '@/stores/notifications';
import { AuthUser } from '@/features/auth';
import { useAuth } from '@/hooks/useAuth';

export type UpdateProfileImageDTO = {
  key: string;
  location: string;
};

export const updateProfileImage = (data: UpdateProfileImageDTO): Promise<AuthUser> => {
  return axios.put('/users/my-profile-image', data);
};

export const useUpdateProfileImage = () => {
  const { addNotification } = useNotificationStore();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: (data) => {
      addNotification({
        type: 'success',
        title: 'Profile picture updated',
      });

      // TODO Update frontend caches
      queryClient.setQueryData<AuthUser | undefined>(['profile', `${data.id}`], (cachedProfile) => {
        if (cachedProfile === undefined) {
          return undefined;
        }
        return { ...data };
      });

      updateUser(data);
    },
  });
};
