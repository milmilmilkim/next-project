import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/config/firebase';
import useLogin from '@/hooks/queries/useLogin';
import { isLoginAtom, userProfileAtom } from '@/state/login';
import { useAtom } from 'jotai';
import styled from 'styled-components';

const Login = () => {
  const { login: aLogin, logout } = useLogin();
  const [isLogin] = useAtom(isLoginAtom);
  const [userProfile] = useAtom(userProfileAtom);

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
        <StyledProfile>
          <div className='profile'>
            <p>{userProfile.email}</p>
            <p>{userProfile.displayName}</p>
          </div>
          <div onClick={logout}>logout</div>
        </StyledProfile>
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

const StyledProfile = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export default Login;
