import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers, changeSorting} from './actions.ts';
import {Offers} from '../types/types.ts';
import {cities} from '../mocks/city.ts';
import {SORT_TYPE} from '../variables/variables.tsx';

const initialState = {
  currentCity: cities[3].name,
  offerCard: [] as Offers[],
  currentSort: SORT_TYPE.popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offerCard = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.currentSort = action.payload;
    });
});

export {reducer};
