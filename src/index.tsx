import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { offerExtended } from './mocks/offer-extended';
import { cities} from './mocks/city.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers = {offers} offerExtended = {offerExtended} reviews = {reviews} cities={cities}/>
  </React.StrictMode>
);
