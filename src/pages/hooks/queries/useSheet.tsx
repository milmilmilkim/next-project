import { useQuery } from 'react-query';
import axios from 'axios';
import { ResponseData, ResponseError } from '../../typing/api';
import type { AxiosResponse, AxiosError } from 'axios';

import { List } from '../../typing/sheet';
const useSheet = () => {
  const url = '/api/comment';
  const fetchList = (): Promise<AxiosResponse<ResponseData<List[]>>> => {
    return axios.get(url);
  };

  const {
    isLoading,
    isError,
    data: res,
    error,
  } = useQuery<AxiosResponse<ResponseData<List[]>>, AxiosError<ResponseError>>(
    'list',
    fetchList,
    {
      refetchOnWindowFocus: false, // 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 재실행?
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

  const data = res?.data.data;
  let msg;

  if (error) {
    msg = error.response?.data.msg;
  }

  return { isLoading, isError, data, error, msg };
};

export default useSheet;
