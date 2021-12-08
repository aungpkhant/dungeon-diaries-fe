import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDateTimeRelative = (datetime: string) => {
  return dayjs().to(dayjs(datetime));
};
