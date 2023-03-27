import {
  setIsLoginAtom,
  accessTokenAtom,
  userProfileAtom,
} from '@/state/login';
import { useSetAtom } from 'jotai';
import { User } from 'firebase/auth';
const useLogin = () => {
  const setIsLogin = useSetAtom(setIsLoginAtom);
  const setAcessToken = useSetAtom(accessTokenAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  const login = async (user: User) => {
    const { email, uid, displayName, photoURL } = user;
    setIsLogin(true);
    setUserProfile({
      email: email!,
      uid: uid!,
      displayName: displayName || '',
      photoURL: photoURL || '',
    });
    setAcessToken(await user.getIdToken());
  };

  const logout = () => {
    setIsLogin(false);
    setAcessToken(null);
  };

  return { login, logout };
};

export default useLogin;
