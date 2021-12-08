import Axios from 'axios';

import { API_URL } from '@/config';

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.interceptors.response.use((response) => {
  return response.data;
});

// Unlike the `axios` instance above, this one will not toast a notification when a request fails
export const axiosWithoutIntercept = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosWithoutIntercept.interceptors.response.use((response) => {
  return response.data;
});
