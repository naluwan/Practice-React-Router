import { Navigate } from 'react-router-dom';
import useStore from '@/store';
import shallow from 'zustand/shallow';

const Login = () => {
  const { user, onLogin, loading } = useStore((state) => {
    return {
      user: state.user,
      onLogin: state.onLogin,
      loading: state.loading,
    };
  }, shallow);

  const atLogin = () => {
    // Mock data
    onLogin('interinfo@interinfo.com.tw', '12345');
  };

  if (user) {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = decodeURIComponent(
      searchParams.get('redirect_url') ?? '/',
    );

    console.log(
      'searchParams.get(redirect_url)',
      searchParams.get('redirect_url'),
    );

    console.log('redirectUrl', redirectUrl);

    return <Navigate to={redirectUrl} />;
  }
  return (
    <section data-name="Login">
      {loading && <div className="my-spinner" />}
      <button className="btn btn-primary" onClick={atLogin}>
        Login
      </button>
    </section>
  );
};

export default Login;
