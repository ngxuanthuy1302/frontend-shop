/** @format */

import axios from 'axios';
import { AppConfig } from '../AppConfig';

export enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
