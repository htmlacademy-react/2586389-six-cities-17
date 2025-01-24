import {describe} from 'vitest';
import {DataStatus} from '../../../const.ts';
import {offerReducer} from '../offer-extended-slice.ts';
import {OfferProcess} from '../../../types/types.ts';
import {addToFavoriteOffer, getOfferInfoById, logoutAction, removeToFavoriteOffer} from '../../api-actions.ts';
import {makeFakeOfferExtended} from '../../../utils/mocks/mocks.ts';

describe('OfferExtendedProcess Slice', () => {
  const emptyAction = { type: '' };

  // @-- initial state with empty action --@ //
  it('Should return initial state with empty action', () => {
    const expectedState: OfferProcess = {
      data: null,
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };
    const result = offerReducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @--  default initial state with empty action and undefined --@ //
  it('Should return default initial state with empty action and undefined state', () => {
    const expectedState: OfferProcess = {
      data: null,
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };
    const result = offerReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @-- getOfferInfoById.pending --@ //
  it('Should set "status" to "loading" with "getOfferInfoById.pending"', () => {
    const expectedState: OfferProcess = {
      data: null,
      status: DataStatus.Loading,
      isOfferDataLoading: true,
      isErrorInOfferDataLoading: false,
    };
    const result = offerReducer(undefined, getOfferInfoById.pending);
    expect(result).toEqual(expectedState);
  });

  // @-- getOfferInfoById.fulfilled --@ //
  it('Should set "status" to "loaded" and data to offer\'s data object with "getOfferInfoById.fulfilled"', () => {
    const mockOffer = makeFakeOfferExtended();
    const expectedState: OfferProcess = {
      data: mockOffer,
      status: DataStatus.Loaded,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };
    const result = offerReducer(undefined, getOfferInfoById.fulfilled(mockOffer, '', ''));
    expect(result).toEqual(expectedState);
  });

  // @-- getOfferInfoById.rejected --@ //
  it('Should set "status" to "error" with "getOfferInfoById.rejected"', () => {
    const expectedState: OfferProcess = {
      data: null,
      status: DataStatus.Error,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: true,
    };
    const result = offerReducer(undefined, getOfferInfoById.rejected);
    expect(result).toEqual(expectedState);
  });

  // @-- addToFavoriteOffer.fulfilled --@ //
  it('Should update favorite status with "addToFavoriteOffer.fulfilled"', () => {
    const mockOffer = makeFakeOfferExtended();

    const initialState: OfferProcess = {
      data: { ...mockOffer, isFavorite: false },
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };

    const expectedState: OfferProcess = {
      data: { ...mockOffer, isFavorite: true },
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };

    const result = offerReducer(initialState, addToFavoriteOffer.fulfilled);
    expect(result).toEqual(expectedState);
  });

  // @-- removeToFavoriteOffer.fulfilled --@ //
  it('Should update favorite offers with "removeToFavoriteOffer.fulfilled"', () => {
    const mockOffer = makeFakeOfferExtended();

    const initialState: OfferProcess = {
      data: { ...mockOffer, isFavorite: true },
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };

    const expectedState: OfferProcess = {
      data: { ...mockOffer, isFavorite: false },
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };

    const result = offerReducer(initialState, removeToFavoriteOffer.fulfilled);
    expect(result).toEqual(expectedState);
  });

  // @-- logoutAction.fulfilled --@ //
  it('should remove favorite status from offer with "logoutAction.fulfilled"', () => {
    const mockOffer = makeFakeOfferExtended();

    const initialState: OfferProcess = {
      data: { ...mockOffer, isFavorite: true },
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };

    const expectedState: OfferProcess = {
      data: { ...mockOffer, isFavorite: false },
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    };

    const result = offerReducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
