import {NearPlacesProcess} from '../../types/types.ts';
import {DataStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchNearPlacesOffers, logoutAction} from '../api-actions.ts';

const initialState: NearPlacesProcess = {
  data: [],
  status: DataStatus.Unknown
};

export const nearPlacesSlice = createSlice({
  name: NameSpace.NearPlaces,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    // @-- fetch nearPlaces --@ \\
      .addCase(fetchNearPlacesOffers.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(fetchNearPlacesOffers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = DataStatus.Loaded;
      })
      .addCase(fetchNearPlacesOffers.rejected, (state) => {
        state.status = DataStatus.Error;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.data = state.data.map((offer) => ({ ...offer, isFavorite: false }));
      });
  }
});

export const nearPlacesReducer = nearPlacesSlice.reducer;
export default nearPlacesSlice.reducer;
