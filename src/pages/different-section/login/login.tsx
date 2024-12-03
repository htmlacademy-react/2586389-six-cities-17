import { Helmet } from 'react-helmet-async';
import HeaderSixSities from '../../identical-section/header-six-sities/header-six-sities';
import LoginInput from '../../identical-section/login-component/login-input/login-input';
import LoginLocation from '../../identical-section/login-component/login-locations/login-locations';

function Login (): JSX.Element {
  return(
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 sities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderSixSities />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginInput />
          <LoginLocation />
        </div>
      </main>
    </div>

  );
}

export default Login;
