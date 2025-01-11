import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token.ts';
import {BackendUrl, RequestTimeout} from '../variables/variables.tsx';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BackendUrl,
    timeout: RequestTimeout,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
