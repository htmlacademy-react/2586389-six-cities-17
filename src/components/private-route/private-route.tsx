import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import {useAppSelector} from '../hooks';
import {getAuthStatus} from '../../store/auth-slice/auth-selector.ts';

type PrivateRouteProps = {
    children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element{
  const {children} = props;
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
