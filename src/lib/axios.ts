import Axios from 'axios';

import { API_URL } from '@/config';
import { useNotificationStore } from '@/stores/notifications';

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);

export const axiosS3 = Axios.create();

axiosS3.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);

// Unlike the `axios` instance above, this one will not toast a notification when a request fails
export const axiosWithoutIntercept = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosWithoutIntercept.interceptors.response.use((response) => {
  return response.data;
});
