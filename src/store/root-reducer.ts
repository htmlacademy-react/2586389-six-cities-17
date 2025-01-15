import { combineReducers } from '@reduxjs/toolkit';
import { cityReducer } from './sity-slice/sity-slice.ts';
import { offersReducer } from './offers-slice/offers-slice.ts';
import { sortReducer } from './sort-slice/sort-slice.ts';
import { authReducer } from './auth-slice/auth-slice.ts';
import { reviewsReducer } from './reviews-slice/reviews-slice.ts';
import { offerReducer } from './offer-extended-slice/offer-extended-slice.ts';
import { nearPlacesReducer } from './near-places-slice/near-places-slice.ts';

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  sort: sortReducer,
  auth: authReducer,
  reviews: reviewsReducer,
  offer: offerReducer,
  nearPlaces: nearPlacesReducer,
});

export default rootReducer;
