import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { offerExtended } from './mocks/offer-extended';
import { cities} from './mocks/city.ts';
import {store} from './store';
import {loadOffers} from './store/actions.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOffers(offers));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers = {offers} offerExtended = {offerExtended} reviews = {reviews} cities={cities}/>
    </Provider>
  </React.StrictMode>
);
