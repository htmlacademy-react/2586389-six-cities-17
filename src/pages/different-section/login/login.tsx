import { Helmet } from 'react-helmet-async';
import HeaderSixSities from '../../identical-section/header-six-sities/header-six-sities';
import LoginLocation from '../../identical-section/login-locations/login-locations';
import {useRef} from 'react';
import {useAppDispatch} from '../../../components/hooks';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';
import {FormEvent} from 'react';
import {loginAction} from '../../../store/api-actions.ts';

function Login (): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmitLoginForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current && passwordRef.current) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }))
        .then((response: { meta: { requestStatus: string } }) => {
          if (response.meta.requestStatus === 'fulfilled') {
            navigate(AppRoute.Main);
          }
        });
    }
  };

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
      <main className="page__main page__main--login" data-testid='login-element'>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmitLoginForm} action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="email-input"
                  ref={loginRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  data-testid="password-input"
                  pattern='^.*(?=.*[a-zа-яё])(?=.*\d).*$'
                  title='Пароль должен содержать как минимум 1 букву и 1 цифру'
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <LoginLocation/>
        </div>
      </main>
    </div>

  );
}

export default Login;
