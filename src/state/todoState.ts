import {atom} from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Todo } from '@/typing/todo';
const testAtom = atom<number>(0);
const storageAtom = atomWithStorage('test', '123');

const todoListAtom = atomWithStorage<Todo[] | never[]>('todoList', []);


export {testAtom, storageAtom, todoListAtom}