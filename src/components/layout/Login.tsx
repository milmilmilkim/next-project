import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/config/firebase';
import useLogin from '@/hooks/queries/useLogin';
import { isLoginAtom } from '@/state/login';
import { useAtom } from 'jotai';

const Login = () => {
  const { login: aLogin } = useLogin();
  const [isLogin] = useAtom(isLoginAtom);

  const join = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      aLogin(user);
    } catch (err) {
      const { code, message } = err as unknown as FirebaseError;
      console.error('firebase error');
      console.error(code);
      console.error(message);
    }
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      aLogin(user);
    } catch (err) {
      const { code, message } = err as unknown as FirebaseError;
      console.error(code);
      console.error(message);
      alert(message);
    }
  };

  return (
    <>
      {isLogin ? (
        '로그인중'
      ) : (
        <form onSubmit={login}>
          <input type='email' name='email' placeholder='email' />
          <input type='password' name='password' />
          <button type='submit'>login</button>
        </form>
      )}
      {/* <form onSubmit={join}>
        <input type='email' name='email' placeholder='email' />
        <input type='password' name='password' />
        <button type='submit'>join</button>
      </form> */}
      <hr />
    </>
  );
};

export default Login;
