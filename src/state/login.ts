import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const userProfileAtom = atom({
  email: '',
  displayName: '',
  photoURL: '',
  uid: '',
});

const isLoginAtom = atom<boolean>(false);

const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);

const setIsLoginAtom = atom(null, (get, set, val: boolean) => {
  set(isLoginAtom, val);
});

export { userProfileAtom, accessTokenAtom, setIsLoginAtom, isLoginAtom };
