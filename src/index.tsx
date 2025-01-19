import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthStatus, fetchOffers, getListOfFavoritesOffers} from './store/api-actions.ts';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffers());
store.dispatch(checkAuthStatus())
  .then((response) => {
    if (response.meta.requestStatus === 'fulfilled') {
      store.dispatch(getListOfFavoritesOffers);
    }
  });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
