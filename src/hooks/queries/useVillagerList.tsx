import { useQuery } from 'react-query';
import axios from 'axios';
import { ResponseError, ResponseData } from '../../typing/api';
import type { AxiosResponse, AxiosError } from 'axios';
import type { Villager, SearchOptions } from '@/typing/villager';

const useVillager = ({ page, size, keyword }: SearchOptions) => {
  const url = '/api/villager';
  const fetchList = (): Promise<AxiosResponse<ResponseData<Villager[]>>> => {
    return axios.get(url, {
      params: {
        page,
        size,
        keyword,
      },
    });
  };
  const {
    isLoading,
    isError,
    data: res,
    error,
  } = useQuery<
    AxiosResponse<ResponseData<Villager[]>>,
    AxiosError<ResponseError>
  >(['villagerList', page, size, keyword], () => fetchList(), {
    refetchOnWindowFocus: false,
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.warn('호출 실패');
      console.error(e);
    },
  });

  const data = res?.data;
  let msg;

  if (error) {
    msg = error.response?.data.msg;
  }

  return { isLoading, isError, data, error, msg };
};

export default useVillager;
