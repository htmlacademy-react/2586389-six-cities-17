import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import Main from '../../pages/different-section/main/main';
import Favorites from '../../pages/different-section/favorites/favorites';
import Offer from '../../pages/different-section/offer/offer';
import NotFound from '../../pages/different-section/not-found/not-found';
import Login from '../../pages/different-section/login/login';
import PrivateRoute from '../private-route/private-route';
import { Offers, OfferExtended, Reviews, City } from '../../types/types';

export interface AppProps {
      offers: Offers[];
      cities: City[];
  // eslint-disable-next-line react/no-unused-prop-types
      offerExtended: OfferExtended;
  // eslint-disable-next-line react/no-unused-prop-types
      reviews: Reviews[];
}

function App({offers,cities, reviews, offerExtended}: AppProps): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element={<Main city={cities} />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                  <Favorites offers={offers}/>
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<Offer offers={offers} reviews={reviews} offerExtended={offerExtended}/>} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
