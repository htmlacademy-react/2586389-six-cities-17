import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import Main from '../../pages/different-section/main/main';
import Favorites from '../../pages/different-section/favorites/favorites';
import Offer from '../../pages/different-section/offer/offer';
import NotFound from '../../pages/different-section/not-found/not-found';
import Login from '../../pages/different-section/login/login';
import PrivateRoute from '../private-route/private-route';
import {City, Offers} from '../../types/types.ts';
import {useAppSelector} from '../hooks';
import Spinner from '../../pages/identical-section/spinner/spinner.tsx';
import {getOffersLoadingStatus} from '../../store/offers-slice/offers-selector.ts';
import {getAuthStatus} from '../../store/auth-slice/auth-selector.ts';

export interface AppProps {
  cities: City[];
  offers: Offers[];
}

function App({cities, offers}: AppProps): JSX.Element {
  const isLoading = useAppSelector(getOffersLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<Main city={cities}/>} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<Offer />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
