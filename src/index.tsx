import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import Offers from './variables/variables';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <App numberRentals={Offers.NumberRentals} />

  </React.StrictMode>
);
