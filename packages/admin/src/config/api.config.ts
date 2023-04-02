import axios from 'axios';
import { QueryClient } from 'react-query';

import { API_BASE_URL } from './environment.config';

export const initAxios = () => {
  axios.defaults.baseURL = API_BASE_URL;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
