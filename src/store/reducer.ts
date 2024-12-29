import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers} from './actions.ts';
import {Offers} from '../types/types.ts';
import {cities} from '../mocks/city.ts';

const initialState = {
  currentCity: cities[3].name,
  offerCard: [] as Offers[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offerCard = action.payload;
    });
});

export {reducer};
