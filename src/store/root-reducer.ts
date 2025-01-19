import { combineReducers } from '@reduxjs/toolkit';
import { offersReducer } from './offers-slice/offers-slice.ts';
import { authReducer } from './auth-slice/auth-slice.ts';
import { reviewsReducer } from './reviews-slice/reviews-slice.ts';
import { offerReducer } from './offer-extended-slice/offer-extended-slice.ts';
import { nearPlacesReducer } from './near-places-slice/near-places-slice.ts';
import {favoriteReducer} from './favorite-slice/favorite-slice.ts';

const rootReducer = combineReducers({
  offers: offersReducer,
  auth: authReducer,
  reviews: reviewsReducer,
  offer: offerReducer,
  nearPlaces: nearPlacesReducer,
  favorite: favoriteReducer,
});

export default rootReducer;
