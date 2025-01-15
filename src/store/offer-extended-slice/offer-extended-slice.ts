//import {OfferProcess, ReviewsProcess} from '../../types/types.ts';
import {DataStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import { getOfferInfoById, logoutAction} from '../api-actions.ts';
import { OfferProcess} from '../../types/types.ts';

const initialState: OfferProcess = {
  data: null,
  status: DataStatus.Unknown,
  isOfferDataLoading: false,
  isErrorInOfferDataLoading: false,
};

const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // @-- get offerInfo by id --@ \\
      .addCase(getOfferInfoById.pending, (state) => {
        state.status = DataStatus.Loading;
        state.isOfferDataLoading = true;
        state.isErrorInOfferDataLoading = false;
      })
      .addCase(getOfferInfoById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = DataStatus.Loaded;
        state.isOfferDataLoading = false;
        state.isErrorInOfferDataLoading = false;
      })
      .addCase(getOfferInfoById.rejected, (state) => {
        state.status = DataStatus.Error;
        state.isOfferDataLoading = false;
        state.isErrorInOfferDataLoading = true;
      })
      // @-- logout --@ \\
      .addCase(logoutAction.fulfilled, (state) => {
        if (state.data) {
          state.data.isFavorite = false;
        }
      });
  }
});

export const offerReducer = offerSlice.reducer;
export default offerSlice.reducer;
