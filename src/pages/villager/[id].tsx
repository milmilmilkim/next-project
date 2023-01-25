// import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from '@/utils/axios';
import { Villager } from '../../typing/villager';
import Info from '@/components/villager/Info';
import dayjs from 'dayjs';
import useSheet from '../../hooks/queries/useSheet';
import useCommentMutation from '@/hooks/queries/useCommentMutation';
import styled from 'styled-components';
import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';
import { userName as jotaiUserName } from '@/state/comment';

type PageProps = {
  data: { data: Villager };
};

const page: React.FC<PageProps> = ({ data: { data } }) => {
  const {
    data: commentList,
    isLoading,
    isError,
    msg,
  } = useSheet({ villagerId: data.id });

  const [userName, setUserName] = useAtom(jotaiUserName);

  const { mutate, isLoading: isCLoading } = useCommentMutation();
  const postComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { userName, comment } = e.currentTarget;

      if (!comment.value || !userName) {
        alert('닉네임과 댓글을 입력하세요');
        return;
      }
      mutate({
        id: data.id,
        name: userName.value,
        comment: comment.value,
        date: dayjs(new Date()).format('YYYY-MM-DD hh:mm'),
      });

      setUserName(userName.value);

      comment.value = '';
    },
    [mutate]
  );

  return (
    <>
      <Info data={data} />
      <hr />
      {isError && <span>Error: {msg}</span>}
      {isLoading || isCLoading ? (
        <span>Loading...</span>
      ) : (
        <StyledComment>
          {commentList?.map((item, index) => (
            <ul key={index}>
              <li className='name'>{item.name}</li>
              <li>{item.comment}</li>
              <li className='date'>{item.date}</li>
            </ul>
          ))}
          <hr />
          <form onSubmit={postComment}>
            <input
              name='userName'
              placeholder='작성자'
              defaultValue={userName || ''}
            />
            <input name='comment' />
            <button type='submit'>post</button>
          </form>
        </StyledComment>
      )}
    </>
  );
};

const StyledComment = styled.div`
  ul {
    display: flex;
    padding: 10px;

    li {
      padding: 5px;

      &.name {
        font-weight: bolder;
      }

      &.date {
        font-size: 11px;
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axios.get('/api/villager/' + query.id);

  return {
    props: {
      data,
    },
  };
};

export default page;
