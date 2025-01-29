import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {getToken} from './token.ts';
import {ErrorMesageType} from '../types/types.ts';
import {StatusCodeMapping, BackendUrl, RequestTimeout} from '../const.ts';
import { toast} from 'react-toastify';

const shouldDisplayError = (response: AxiosResponse) => Boolean(StatusCodeMapping[response.status]);

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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMesageType>) => {
      if(error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
