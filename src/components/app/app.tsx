import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import Main from '../../pages/different-section/main/main';
import Favorites from '../../pages/different-section/favorites/favorites';
import Offer from '../../pages/different-section/offer/offer';
import NotFound from '../../pages/different-section/not-found/not-found';
import Login from '../../pages/different-section/login/login';
import PrivateRoute from '../private-route/private-route';
import {City, OfferExtended, Offers, Reviews} from '../../types/types.ts';

export interface AppProps {
  cities: City[];
  offers: Offers[];
  reviews: Reviews[];
  offerExtended: OfferExtended;
}

function App({cities, offers, reviews, offerExtended}: AppProps): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element={<Main city={cities}/>} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                  <Favorites offers={offers}/>
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<Offer offers={offers} offerExtended={offerExtended} reviews={reviews}/>} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
