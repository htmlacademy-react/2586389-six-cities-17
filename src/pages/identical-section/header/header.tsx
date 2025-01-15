import {Link, useLocation, useNavigate} from 'react-router-dom';
import HeaderSixSities from '../header-six-sities/header-six-sities';
import {AppRoute, AuthorizationStatus} from '../../../const.ts';
import {useAppDispatch, useAppSelector} from '../../../components/hooks';
import {getAuthStatus, getAvatarUrl, getUserName} from '../../../store/auth-slice/auth-selector.ts';
import {logoutAction} from '../../../store/api-actions.ts';
import {MouseEvent} from 'react';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const userLogin = useAppSelector(getUserName);
  const avatarUrl = useAppSelector(getAvatarUrl);

  const handleLogoutClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction())
      .then(() => {
        if (currentPath as AppRoute === AppRoute.Favorites) {
          navigate(AppRoute.Main);
        }
      });
  };

  const actionLink =
    authorizationStatus !== AuthorizationStatus.Auth ? (
      <Link className="header__nav-link" to={AppRoute.Login}>
        <span className="header__signout">Sign in</span>
      </Link>
    ) : (
      <a href="#" className="header__nav-link" onClick={handleLogoutClick}>
        <span className="header__signout">Sign Out</span>
      </a>
    );
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderSixSities />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth && (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img
                        className="header__avatar user__avatar"
                        src={avatarUrl}
                        alt='User avatar'
                      />
                    </div>
                    <span className="header__user-name user__name">{userLogin}</span>
                  </Link>
                </li>
              )}
              <li className="header__nav-item">
                {actionLink}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
