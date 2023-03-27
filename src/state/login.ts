import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { User } from '@/typing/user';
const userProfileAtom = atom<User>({
  email: '',
  displayName: '',
  photoURL: '',
  uid: '',
  accessToken: '',
});

const isLoginAtom = atom<boolean>(false);

const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);

const setIsLoginAtom = atom(null, (get, set, val: boolean) => {
  set(isLoginAtom, val);
});

export { userProfileAtom, accessTokenAtom, setIsLoginAtom, isLoginAtom };
