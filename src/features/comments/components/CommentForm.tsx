import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { TextAreaField } from '@/components/Form/TextAreaField';
import { Button } from '@/components/Elements';
import { useCreateComment } from '../api/createComment';
import { useParams } from 'react-router';

const schema = z.object({
  content: z.string().min(1, 'Content is required').max(1000, 'Maximum 1000 characters'),
});
// parentCommentId: z.number().nullable(),

export const CommentForm = () => {
  const { mutate, isLoading } = useCreateComment();
  const { postId } = useParams();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      parentCommentId: null,
      content: '',
    },
  });

  const newCommentSubmit = (data: any) => {
    if (postId) {
      mutate(
        { postId, data },
        {
          // Improvement: scroll to new comment after successful post
          onSuccess: () => {
            methods.reset();
          },
        }
      );
    }
  };

  return (
    <form className="px-4 sm:px-0" onSubmit={methods.handleSubmit(newCommentSubmit)}>
      <TextAreaField
        label="Comment"
        {...methods.register('content')}
        error={methods.formState.errors['content']}
      />
      <div className="flex  justify-end pt-2">
        <Button variant="primary" type="submit" isLoading={isLoading}>
          Publish
        </Button>
      </div>
    </form>
  );
};
