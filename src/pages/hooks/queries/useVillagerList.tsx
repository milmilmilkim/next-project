import { useQuery } from 'react-query';
import axios from 'axios';
import { ResponseError } from '../../typing/api';
import { useEffect } from 'react';
import type { AxiosResponse, AxiosError } from 'axios';
import type { Villager } from '@/pages/typing/common';

const options = {
  keyword: '',
  page: 1,
  size: 15,
};

const useVillager = ({ currentPage }: any) => {
  console.log(currentPage);
  const url = '/api/villager';
  const fetchList = (page : number): Promise<AxiosResponse<Villager[]>> => {
    return axios.get(url, {
      params: {
        page
      },
    });
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  const {
    isLoading,
    isError,
    data: res,
    error,
  } = useQuery<AxiosResponse<Villager[]>, AxiosError<ResponseError>>(
    ['villagerList', currentPage],
    () => fetchList(currentPage),
    {
      refetchOnWindowFocus: false,
      retry: 0, // 실패시 재호출 몇번 할지
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.warn('호출 실패');
        console.error(e);
      },
    }
  );

  const data = res?.data;
  let msg;

  if (error) {
    msg = error.response?.data.msg;
  }

  return { isLoading, isError, data, error, msg };
};

export default useVillager;
