import {ReviewsProcess} from '../../types/types.ts';
import {DataStatus, NameSpace, PostingStatus} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {fetchOfferReview, postReviewToOffer} from '../api-actions.ts';
import {toast} from 'react-toastify';

const initialState: ReviewsProcess = {
  data: [],
  status: DataStatus.Unknown,
  postingStatus: PostingStatus.Unknown,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // @-- get reviews --@ \\
      .addCase(fetchOfferReview.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(fetchOfferReview.fulfilled, (state, action) => {
        state.status = DataStatus.Loaded;
        state.data = action.payload;
      })
      .addCase(fetchOfferReview.rejected, (state) => {
        state.status = DataStatus.Error;
      })
      // @-- post reviews --@ \\
      .addCase(postReviewToOffer.pending, (state) => {
        state.postingStatus = PostingStatus.Posting;
      })
      .addCase(postReviewToOffer.fulfilled, (state) => {
        state.postingStatus = PostingStatus.Posted;
      })
      .addCase(postReviewToOffer.rejected, (state) => {
        state.postingStatus = PostingStatus.Error;
        toast.error('Could not send review');
      });
  }
});

export const reviewsReducer = reviewsSlice.reducer;
export default reviewsSlice.reducer;

