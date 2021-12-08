import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../api/createPost';

import { Button } from '@/components/Elements';
import { InputField, FileUploadField, TextAreaField } from '@/components/Form';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export function NewPostForm() {
  const { mutate, isLoading } = useCreatePost();
  const methods = useForm({ resolver: zodResolver(schema) });

  const newPostSubmit = (data: any) => {
    mutate(data);
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
      <FileUploadField />
      <div className="flex">
        <Button className="ml-auto" type="submit" isLoading={isLoading}>
          Publish
        </Button>
      </div>
    </form>
  );
}
