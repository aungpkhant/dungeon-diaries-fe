import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCreatePost } from '../api/createPost';
import { getPresignedUrl, uploadFileToS3 } from '@/features/file-upload';

import { Button } from '@/components/Elements';
import { InputField, FileUploadField, TextAreaField } from '@/components/Form';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.any(),
});

export function NewPostForm() {
  const { mutate, isLoading } = useCreatePost();
  const methods = useForm({ resolver: zodResolver(schema) });

  // TODO limit filesize?

  const newPostSubmit = async (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const { image, ...postData } = data;
    if (image?.[0]) {
      const content_type = image?.[0].name.split('.').pop();

      // Upload to S3
      const preSignedUrlData = await getPresignedUrl(content_type);

      const s3XmlResponse = await uploadFileToS3(
        preSignedUrlData.url,
        preSignedUrlData.fields,
        data.image[0]
      );

      // Parse Location and Key from S3 response
      const xmlParser = new DOMParser();
      const s3XmlDoc = xmlParser.parseFromString(s3XmlResponse, 'text/xml');

      const key = s3XmlDoc.getElementsByTagName('Key')[0].childNodes[0].nodeValue;
      const location = s3XmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;

      mutate({ ...postData, key, location });
    } else {
      mutate(postData);
    }
  };

  return (
    <form className="space-y-6" onSubmit={methods.handleSubmit(newPostSubmit)}>
      <InputField
        label="Title"
        type="text"
        {...methods.register('title')}
        error={methods.formState.errors['title']}
      />
      <TextAreaField
        label="Content"
        {...methods.register('content')}
        error={methods.formState.errors['content']}
      />
      <FileUploadField
        label="Photo (Optional)"
        control={methods.control}
        {...methods.register('image')}
        error={methods.formState.errors['image']}
      />
      <div className="flex">
        <Button className="ml-auto" type="submit" isLoading={isLoading}>
          Publish
        </Button>
      </div>
    </form>
  );
}
