import {Offers} from '../../types/types.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchOffers} from '../api-actions.ts';

interface OffersState {
  offers: Offers[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load offers';
      });
  },
});

export const offersReducer = offersSlice.reducer;
export default offersSlice.reducer;
