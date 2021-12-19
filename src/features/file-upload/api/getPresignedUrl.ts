import { axios } from '@/lib/axios';

export const getPresignedUrl = (content_type: string): Promise<any> => {
  return axios.post('/uploads/upload_intent', {
    content_type,
  });
};
