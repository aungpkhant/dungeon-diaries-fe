import clsx from 'clsx';
import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { ProfileLayout } from './ProfileLayout';
import { AuthUser } from '@/features/auth';
import { formatDate } from '@/lib/dayjs';
import { TextAreaField } from '@/components/Form';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateProfileImage } from '../../api/updateProfilePicture';
import { getPresignedUrl, uploadFileToS3 } from '@/features/file-upload';
import { Spinner } from '@/components/Elements';

type ProfileProps = {
  userProfile: AuthUser;
  isEditingProfile: boolean;
};

export const Profile = ({ userProfile, isEditingProfile }: ProfileProps) => {
  const { user } = useAuth();
  const { register } = useFormContext();
  const { mutate } = useUpdateProfileImage();
  const profileImageUploadInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const isProfileOwner = user?.id === userProfile.id;

  const handleProfileEditClick = () => {
    if (isProfileOwner && !isUploading) {
      profileImageUploadInputRef?.current?.click();
    }
  };

  const handleImageChange = async () => {
    // TODO refactor DRY
    setIsUploading(true);

    // Update image optmistically
    const image = profileImageUploadInputRef.current?.files?.[0];

    if (!image) {
      return;
    }

    // Call upload intent
    const content_type = image.name.split('.').pop();

    // Upload to S3
    const preSignedUrlData = await getPresignedUrl(content_type!);

    // Call aws
    const s3XmlResponse = await uploadFileToS3(
      preSignedUrlData.url,
      preSignedUrlData.fields,
      image
    );

    // Parse Location and Key from S3 response
    const xmlParser = new DOMParser();
    const s3XmlDoc = xmlParser.parseFromString(s3XmlResponse, 'text/xml');

    const key = s3XmlDoc.getElementsByTagName('Key')[0].childNodes[0].nodeValue;
    const location = s3XmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;

    mutate(
      // @ts-ignore
      { key, location },
      {
        onSettled: () => {
          setIsUploading(false);
        },
      }
    );
  };

  return (
    <ProfileLayout
      ProfileLeftComponent={
        <div className="absolute top-6 left-6">
          <img
            className={clsx(
              'h-32 w-32 sm:h-48 sm:w-48 rounded-lg shadow-md bg-gray-100',
              isProfileOwner && 'cursor-pointer'
            )}
            src={userProfile.profile_image ?? '/assets/default_profile.png'}
            onClick={handleProfileEditClick}
          />
          {isUploading && <Spinner className="absolute right-3 bottom-3" />}
          <input
            ref={profileImageUploadInputRef}
            type="file"
            className="sr-only"
            accept="image/gif, image/jpeg, image/png"
            onChange={handleImageChange}
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
          {isEditingProfile ? (
            <TextAreaField label="Write something about yourself" {...register('bio')} />
          ) : (
            <p className="text-gray-700">{userProfile.bio}</p>
          )}
        </div>
      }
    />
  );
};
