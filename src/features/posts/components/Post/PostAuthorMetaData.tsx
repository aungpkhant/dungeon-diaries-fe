import { formatDateTimeRelative } from '@/lib/dayjs';
import { TPost } from '../../types';
import { Authorization, POLICIES } from '@/lib/authorization';
import { Badge } from '@/components/Elements';
import { useAuth } from '@/hooks/useAuth';

const dummyAuthorImageUrl =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export const PostAuthorMetaData = ({
  author,
  author_id,
  created_at,
}: Pick<TPost, 'author' | 'author_id' | 'created_at'>) => {
  const { user } = useAuth();

  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <img className="h-12 w-12 rounded-full" src={dummyAuthorImageUrl} alt="" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-gray-900">
          <a href={'#'} className="hover:underline">
            {author}
          </a>
          <Authorization policyCheck={POLICIES.owner(user, author_id)}>
            <span className="ml-2">
              <Badge>Me</Badge>
            </span>
          </Authorization>
        </p>
        <p className="text-base text-gray-500">
          <time dateTime={created_at}>{formatDateTimeRelative(created_at)}</time>
        </p>
      </div>
    </div>
  );
};
