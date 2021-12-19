import { axiosS3 } from '@/lib/axios';

// TODO types here
export const uploadFileToS3 = (url: string, fields: any, file: any): Promise<any> => {
  const formData = new FormData();
  // @ts-ignore
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  formData.append('file', file);

  return axiosS3.post(url, formData);
};
