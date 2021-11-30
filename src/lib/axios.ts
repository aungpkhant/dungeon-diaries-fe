import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();

  config.headers = {
    Authorization: `${token}`,
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `${token}`,
    };
  }
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use((response) => {
  return response.data;
});

export const axiosWithoutIntercept = Axios.create({
  baseURL: API_URL,
});

axiosWithoutIntercept.interceptors.response.use((response) => {
  return response.data;
});
