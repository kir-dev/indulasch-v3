import { useQuery } from 'react-query';
import axios from 'axios';
import { QueryKeys } from '../config/query.config';
import { ApiPaths } from '../config/paths.config';
import { LoginResponseDto } from '../types/dto.types';

export function useLoginQuery() {
  return useQuery<LoginResponseDto, Error>(
    QueryKeys.LOGIN,
    async () => {
      const { data } = await axios.get<LoginResponseDto>(ApiPaths.LOGIN);
      return data;
    },
    { enabled: false }
  );
}
