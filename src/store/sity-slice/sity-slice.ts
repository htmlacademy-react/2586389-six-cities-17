import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cities} from '../../mocks/city.ts';

const initialState = {
  currentCity: cities[3].name,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
  },
});

export const {changeCity} = citySlice.actions;
export const cityReducer = citySlice.reducer;
export default citySlice.reducer;
