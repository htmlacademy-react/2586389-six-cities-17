import {describe} from 'vitest';
import {DataStatus, PostingStatus} from '../../../const.ts';
import {getRandomInteger} from '../../../utils/utlis.ts';
import {makeFakeReviewData, makeFakeReviews} from '../../../utils/mocks/mocks.ts';
import {faker} from '@faker-js/faker';
import {fetchOfferReview, postReviewToOffer} from '../../api-actions.ts';
import {reviewsReducer} from '../reviews-slice.ts';
import {ReviewsProcess} from '../../../types/types.ts';
import {toast} from 'react-toastify';

describe('ReviewsProcess Slice', () => {
  const emptyAction = { type: '' };

  it('Should return initial state with empty action', () => {
    const expectedState: ReviewsProcess = {
      data: [],
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Unknown,
    };
    const result = reviewsReducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action and undefined state', () => {
    const expectedState: ReviewsProcess = {
      data: [],
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Unknown,
    };
    const result = reviewsReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should set "status" to "loading" with "fetchOfferReview.pending"', () => {
    const expectedState: ReviewsProcess = {
      data: [],
      status: DataStatus.Loading,
      postingStatus: PostingStatus.Unknown,
    };

    const result = reviewsReducer(undefined, fetchOfferReview.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set "status" to "loaded", "data" to array of reviews with "fetchOfferReview.fulfilled"', () => {
    const mockReviews = Array.from({ length: getRandomInteger(0, 10) }, makeFakeReviews);
    const mockOfferId = faker.string.nanoid();
    const expectedState: ReviewsProcess = {
      data: mockReviews,
      status: DataStatus.Loaded,
      postingStatus: PostingStatus.Unknown,
    };
    const result = reviewsReducer(undefined, fetchOfferReview.fulfilled(mockReviews, mockOfferId, ''));
    expect(result).toEqual(expectedState);
  });

  it('Should set "status" to "error" with "fetchOfferReview.rejected"', () => {
    const expectedState: ReviewsProcess = {
      data: [],
      status: DataStatus.Error,
      postingStatus: PostingStatus.Unknown,
    };

    const result = reviewsReducer(undefined, fetchOfferReview.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should set "postingStatus" to "posting" with "postReviewToOffer.pending"', () => {
    const expectedState: ReviewsProcess = {
      data: [],
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Posting,
    };

    const result = reviewsReducer(undefined, postReviewToOffer.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set "postingStatus" to "posted" with "postReviewToOffer.fulfilled"', () => {
    const mockReview = makeFakeReviews();
    const mockReviewData = makeFakeReviewData();
    const mockOfferId = faker.string.nanoid();
    const initialState: ReviewsProcess = {
      data: [],
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Unknown,
    };

    const expectedState: ReviewsProcess = {
      data: [],
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Posted,
    };

    const result = reviewsReducer(initialState, postReviewToOffer.fulfilled(mockReview, mockOfferId, mockReviewData));
    expect(result).toEqual(expectedState);
  });

  it('Should set "postingStatus" to "error" and show toast with "postReviewToOffer.rejected"', () => {
    const initialState: ReviewsProcess = {
      data: [],
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Unknown,
    };

    const expectedState: ReviewsProcess = {
      data: [],
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Error,
    };

    const toastErrorMock = vi.spyOn(toast, 'error');
    const result = reviewsReducer(initialState, postReviewToOffer.rejected);
    expect(result).toEqual(expectedState);
    expect(toastErrorMock).toHaveBeenCalledWith('Could not send review');
  });
});
