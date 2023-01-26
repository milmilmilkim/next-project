import { setIsLoginAtom, accessTokenAtom } from '@/state/login';
import { useSetAtom } from 'jotai';
import { User } from 'firebase/auth';
const useLogin = () => {
  const setIsLogin = useSetAtom(setIsLoginAtom);
  const setAcessToken = useSetAtom(accessTokenAtom);

  const login = async (user: User) => {
    setIsLogin(true);
	setAcessToken(await user.getIdToken());
  };

  const logout = () => {
    setIsLogin(false);
	setAcessToken(null);
  };

  return { login, logout };
};

export default useLogin;
