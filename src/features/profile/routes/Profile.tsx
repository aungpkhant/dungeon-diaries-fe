import * as z from 'zod';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/hooks/useAuth';
import { Heading, DeadEnd, Button } from '@/components/Elements';
import { Profile as ProfileDetails, ProfileSkeleton } from '../components';
import { POLICIES, Authorization } from '@/lib/authorization';
import { useToggle } from '@/hooks/useToggle';
import { AuthUser } from '@/features/auth';
import { useUserProfile } from '../api/getUserProfile';
import { useUpdateProfile } from '../api/updateProfile';
import { XIcon, CheckIcon, PencilAltIcon } from '@heroicons/react/outline';

const schema = z.object({
  bio: z.string().max(1000, 'Max length 1000 characters exceeded'),
});

const ProfileContainer = ({
  profileDetails,
  children,
}: {
  profileDetails?: AuthUser;
  children: (isEditingProfile: boolean) => React.ReactNode;
}) => {
  const { user } = useAuth();
  const { isOpen: isEditingProfile, open: startEdit, close: stopEdit, toggle } = useToggle(false);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: profileDetails?.bio,
    },
  });
  const { mutate, isLoading } = useUpdateProfile();

  const handleProfileSave = async (data: any) => {
    await mutate(data);
    stopEdit();
  };

  const handleEditClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    startEdit();
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    methods.reset();
    stopEdit();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleProfileSave)}>
          <header className="flex justify-between mb-4 items-end">
            <Heading>Profile</Heading>
            <Authorization policyCheck={POLICIES.owner(user, profileDetails?.id)}>
              <div className="flex items-end space-x-4 px-2 sm:px-0">
                {isEditingProfile ? (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleCancelClick}
                      startIcon={<XIcon className="h-4 w-4" />}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      isLoading={isLoading}
                      type="submit"
                      startIcon={<CheckIcon className="h-4 w-4" />}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleEditClick}
                    startIcon={<PencilAltIcon className="h-4 w-4" />}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </Authorization>
          </header>
          {children(isEditingProfile)}
        </form>
      </FormProvider>
    </>
  );
};

export const Profile = () => {
  const { userId = '' } = useParams();

  const { data, isIdle, isLoading } = useUserProfile(userId);

  if (isIdle || isLoading) {
    return <ProfileSkeleton />;
  }

  if (!data) return <ProfileContainer>{(_) => <DeadEnd />}</ProfileContainer>;

  return (
    <ProfileContainer profileDetails={data}>
      {(isEditingProfile) => (
        <ProfileDetails isEditingProfile={isEditingProfile} userProfile={data} />
      )}
    </ProfileContainer>
  );
};
