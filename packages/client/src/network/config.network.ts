import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { API_URL } from '../config/environment.config';
import { Config, ConfigDto } from '../types/config.type';
import { useInterval } from '../utils/useInterval';

export function useConfigQuery(id: string) {
  const [config, setConfig] = useState<Config>();
  const [fail, setFail] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const request = () => {
    const url = new URL(`${API_URL}/${id}`);
    axios
      .get<ConfigDto>(url.toString())
      .then((response) => {
        setConfig(response.data.config);
        setFail(false);
        setNotFound(false);
        if (response.data.refreshNeeded) window.location.reload();
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          console.error(err.response);
          if (err.response?.status === 404) {
            setNotFound(true);
          } else setFail(true);
        } else {
          setFail(true);
        }
      });
  };
  useInterval(request, 30000);
  useEffect(request, [id]);
  return { config, fail, notFound, request };
}
