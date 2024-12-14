import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { offersExtended } from './mocks/offer-extended';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers = {offers} offersExtended = {offersExtended} reviews = {reviews} />
  </React.StrictMode>
);
