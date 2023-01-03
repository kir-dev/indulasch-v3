import { useState } from 'react';
import { AxiosResponse, isAxiosError } from 'axios';
import { useAuthContext } from '../context/auth.context';

export function useNetwork<Response, T>(request: (body: T) => Promise<AxiosResponse<Response>>) {
  const { logout } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Response>();
  const makeRequest = (body: T, onSuccess?: () => void, onError?: (err: Error) => void) => {
    setIsLoading(true);
    setIsError(false);
    request(body)
      .then((res) => {
        setData(res.data);
        if (onSuccess) onSuccess();
      })
      .catch((err: Error) => {
        if (isAxiosError(err)) {
          if (err.response?.status === 401) {
            logout();
          }
        }
        if (onError) onError(err);
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, isError, data, makeRequest };
}
