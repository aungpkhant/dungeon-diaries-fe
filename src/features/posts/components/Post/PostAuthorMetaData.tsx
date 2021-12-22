import { formatDateTimeRelative } from '@/lib/dayjs';
import { TPost } from '../../types';

const dummyAuthorImageUrl =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export const PostAuthorMetaData = ({
  author,
  created_at,
}: Pick<TPost, 'author' | 'created_at'>) => {
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
        </p>
        <p className="text-base text-gray-500">
          <time dateTime={created_at}>{formatDateTimeRelative(created_at)}</time>
        </p>
      </div>
    </div>
  );
};
