import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import { offers } from './mocks/offers';
import { cities} from './mocks/city.ts';
import {store} from './store';
import {loadOffers} from './store/actions.ts';
import {checkAuthStatus, fetchOffers} from './store/api-actions.ts';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOffers(offers));
store.dispatch(fetchOffers());
store.dispatch(checkAuthStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App offers = {offers} cities={cities}/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
