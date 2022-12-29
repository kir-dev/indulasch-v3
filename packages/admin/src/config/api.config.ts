import axios from 'axios';
import { QueryClient } from 'react-query';
import { API_BASE_URL } from './environment.config';

export const initAxios = () => {
  axios.defaults.baseURL = API_BASE_URL;
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
