import { combineReducers } from '@reduxjs/toolkit';
import { cityReducer } from './sity-slice/sity-slice.ts';
import { offersReducer } from './offers-slice/offers-slice.ts';
import { sortReducer } from './sort-slice/sort-slice.ts';
import {authReducer} from './auth-slice/auth-slice.ts';

const rootReducer = combineReducers({
  city: cityReducer,
  offers: offersReducer,
  sort: sortReducer,
  auth: authReducer,
});

export default rootReducer;
