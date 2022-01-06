import React from 'react';
import { useParams } from 'react-router-dom';

import { Heading, DeadEnd } from '@/components/Elements';
import { Profile as ProfileDetails, ProfileSkeleton } from '../components';
import { useUserProfile } from '../api/getUserProfile';

const ProfilePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Heading className="mb-4">Profile</Heading>
      {children}
    </>
  );
};

export const Profile = () => {
  const { userId = '' } = useParams();

  const { data, isIdle, isLoading } = useUserProfile(userId);

  if (isIdle || isLoading) {
    return <ProfileSkeleton />;
  }

  if (!data)
    return (
      <ProfilePageLayout>
        <DeadEnd />
      </ProfilePageLayout>
    );

  return (
    <ProfilePageLayout>
      <ProfileDetails userProfile={data} />
    </ProfilePageLayout>
  );
};
