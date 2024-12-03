import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import Main from '../../pages/different-section/main/main';
import Favorites from '../../pages/different-section/favorites/favorites';
import Offer from '../../pages/different-section/offer/offer';
import NotFound from '../../pages/different-section/not-found/not-found';
import Login from '../../pages/different-section/login/login';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
    numberRentals: number;
}

function App({numberRentals}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element={<Main numberRentals={numberRentals} />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<Offer />} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
