import {FavoriteOffersProcess} from '../../types/types.ts';
import {DataStatus} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {toast} from 'react-toastify';
import {addToFavoriteOffer, getListOfFavoritesOffers, logoutAction, removeToFavoriteOffer} from '../api-actions.ts';

const initialState: FavoriteOffersProcess = {
  data: [],
  status: DataStatus.Unknown,
};

export const favoriteSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListOfFavoritesOffers.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(getListOfFavoritesOffers.fulfilled, (state, action) => {
        state.status = DataStatus.Loaded;
        state.data = action.payload;
      })
      .addCase(getListOfFavoritesOffers.rejected, (state) => {
        state.status = DataStatus.Error;
      })
      .addCase(addToFavoriteOffer.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.data.push(updatedOffer);
      })
      .addCase(addToFavoriteOffer.rejected, () => {
        toast.error('Could not add to favorite');
      })
      .addCase(removeToFavoriteOffer.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const offerId = state.data.findIndex((offer) => offer.id === updatedOffer.id);
        state.data.splice(offerId, 1);
      })
      .addCase(removeToFavoriteOffer.rejected, () => {
        toast.error('Could not remove from favorite');
      })
      .addCase(logoutAction.fulfilled, () => initialState);
  }
});

export const favoriteReducer = favoriteSlice.reducer;
export default favoriteSlice.reducer;
