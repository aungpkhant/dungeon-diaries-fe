import { ProfileLayout } from './ProfileLayout';

export const ProfileSkeleton = () => {
  return (
    <ProfileLayout
      ProfileLeftComponent={
        <div className="h-32 w-32 sm:h-48 sm:w-48 absolute top-6 left-6 rounded-lg bg-gray-300" />
      }
      ProfileTopComponent={
        <div className="space-y-3 my-4">
          <div className="h-2.5 w-1/2 animate-pulse bg-gray-300 rounded-lg"></div>
          <div className="h-2.5 w-1/2 animate-pulse bg-gray-300 rounded-lg"></div>
        </div>
      }
      ProfileBottomComponent={
        <div className="space-y-3 my-4">
          <div className="h-2.5 w-1/2 animate-pulse bg-gray-300 rounded-lg"></div>
          <div className="h-2.5 w-full animate-pulse bg-gray-300 rounded-lg"></div>
          <div className="h-2.5 w-full animate-pulse bg-gray-300 rounded-lg"></div>
        </div>
      }
    />
  );
};
