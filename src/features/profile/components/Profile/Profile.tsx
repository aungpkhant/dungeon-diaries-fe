import { PencilAltIcon } from '@heroicons/react/outline';

import { Button } from '@/components/Elements';
import { ProfileLayout } from './ProfileLayout';
import { AuthUser } from '@/features/auth';
import { formatDate } from '@/lib/dayjs';

type ProfileProps = {
  userProfile: AuthUser;
};

export const Profile = ({ userProfile }: ProfileProps) => {
  return (
    <ProfileLayout
      ProfileLeftComponent={
        <div className="h-32 w-32 absolute sm:h-48 sm:w-48 top-6 left-6">
          <img
            className="rounded-lg shadow-md bg-gray-100"
            src={userProfile.profile_image ?? '/assets/default_profile.png'}
          />
          <div className="mt-4 text-center space-y-1">
            <p className="text-sm text-gray-500">Joined {formatDate(userProfile.created_at)}</p>
            <p className="text-sm text-gray-500">Lv 1 Slime</p>
          </div>
        </div>
      }
      ProfileTopComponent={
        <div className="flex">
          <div className="space-y-2 flex-1 min-w-0">
            <h3 className="font-medium text-lg text-gray-800 truncate">{`@${userProfile.username}`}</h3>
            <p className="text-gray-500 font-medium truncate">{userProfile.email}</p>
          </div>
        </div>
      }
      ProfileBottomComponent={
        <div className="space-y-2">
          <h6 className="font-medium text-lg text-gray-500">Bio</h6>
          <p className="text-gray-700">{userProfile.bio}</p>
        </div>
      }
    />
  );
};
