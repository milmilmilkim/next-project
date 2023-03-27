import TestLayout from '@/components/layout/test/TestLayout';
import React, { useReducer } from 'react';
import { useAtom, useSetAtom } from 'jotai';

import { todoListAtom } from '@/state/todoState';
import { isLoginAtom, userProfileAtom } from '@/state/login';
import { Todo } from '@/typing/todo';
import { DateString } from '@/typing/date';
import { useState, useCallback } from 'react';

import dayjs from 'dayjs';

const Page = () => {
  const [isLogin] = useAtom(isLoginAtom);
  const [userProfile] = useAtom(userProfileAtom);
  const [todo, setTodo] = useState<Todo>({
    regUser: userProfile,
    regDate: dayjs().format('YYYYMMDD') as DateString,
    todo: '',
  });
  const [todoList, setTodoList] = useAtom(todoListAtom);

  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTodo({ ...todo, todo: text });
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextTodoList = [...todoList, todo];
    setTodoList(nextTodoList);
    e.currentTarget.todo.value = '';
  };

  return (
    <>
      <hr />
      {todoList && JSON.stringify(todoList)}

      {isLogin ? (
        <div>
          <form onSubmit={addTodo}>
            <input
              type='text'
              placeholder='할 일'
              name='todo'
              onChange={changeTodo}
            />
            <button type='submit'>추가</button>
          </form>
        </div>
      ) : (
        <div>로그인 하세요</div>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <TestLayout>{page}</TestLayout>;
};

export default Page;
