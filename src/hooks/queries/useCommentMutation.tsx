import axios, { AxiosResponse } from 'axios';
import { ResponseData } from '@/typing/api';
import { List } from '@/typing/sheet';
import { useMutation, useQueryClient } from 'react-query';

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const url = '/api/comment';
  const addComment = (
    data: List
  ): Promise<AxiosResponse<ResponseData<{ msg: string }>>> => {
    return axios.post(url, data);
  };

  const { mutate, isLoading, isError } = useMutation(addComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('commentList');
    },
  });

  return { mutate, isLoading, isError };
};

export default useCommentMutation;
