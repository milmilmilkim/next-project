import { User } from './user';
import { DateString } from './date';

type Todo = {
  regUser: User;
  regDate: DateString;
  todo: string;
};

export type { Todo };
