import {describe} from 'vitest';
import {FavoriteOffersProcess} from '../../../types/types.ts';
import {DataStatus} from '../../../const.ts';
import {favoriteReducer} from '../favorite-slice.ts';
import {addToFavoriteOffer, getListOfFavoritesOffers, logoutAction, removeToFavoriteOffer} from '../../api-actions.ts';
import {makeFakeOffers} from '../../../utils/mocks/mocks.ts';
import {getRandomInteger} from '../../../utils/utlis.ts';

describe('Favorite Slice', () => {
  const emptyAction = { type: '' };

  // @-- initial state with empty action --@ //
  it('should return initial state with empty action', () => {
    const expectedState: FavoriteOffersProcess = {
      data: [],
      status: DataStatus.Unknown,
    };

    const result = favoriteReducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @--  default initial state with empty action and undefined --@ //
  it('should return default initial state with empty action and undefined', () => {
    const expectedState: FavoriteOffersProcess = {
      data: [],
      status: DataStatus.Unknown,
    };

    const result = favoriteReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @-- getListOfFavoritesOffers.pending --@ //
  it('should set "status" to "loading" with "getListOfFavoritesOffers.pending"', () => {
    const initialState: FavoriteOffersProcess = {
      data: [],
      status: DataStatus.Unknown,
    };
    const expectedState: FavoriteOffersProcess = {
      data: [],
      status: DataStatus.Loading,
    };

    const result = favoriteReducer(initialState, getListOfFavoritesOffers.pending);
    expect(result).toEqual(expectedState);
  });

  // @-- getListOfFavoritesOffers.fulfilled --@ //
  it('should set "status" to "loading" with "getListOfFavoritesOffers.fulfilled"', () => {
    const mockFavoriteOffers = Array.from({length: 10}, makeFakeOffers);
    const initialState: FavoriteOffersProcess = {
      data: [],
      status: DataStatus.Unknown,
    };
    const expectedState: FavoriteOffersProcess = {
      data: mockFavoriteOffers,
      status: DataStatus.Loaded,
    };

    const result = favoriteReducer(initialState, getListOfFavoritesOffers.fulfilled(mockFavoriteOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  // @-- getListOfFavoritesOffers.rejected --@ //
  it('should set "status" to "loading" with "getListOfFavoritesOffers.rejected"', () => {
    const initialState: FavoriteOffersProcess = {
      data: [],
      status: DataStatus.Unknown,
    };
    const expectedState: FavoriteOffersProcess = {
      data: [],
      status: DataStatus.Error,
    };

    const result = favoriteReducer(initialState, getListOfFavoritesOffers.rejected);
    expect(result).toEqual(expectedState);
  });

  // @-- addToFavoriteOffer.fulfilled --@ //
  it('should add a favorite offer to "data" with "addToFavoriteOffer.fulfilled"', () => {
    const mockFavoriteOffers = Array.from({ length: 10 }, makeFakeOffers);
    const newFavoriteOffer = makeFakeOffers();

    const initialState: FavoriteOffersProcess = {
      data: mockFavoriteOffers,
      status: DataStatus.Loaded,
    };
    const expectedState: FavoriteOffersProcess = {
      data: [...mockFavoriteOffers, newFavoriteOffer],
      status: DataStatus.Loaded,
    };

    const result = favoriteReducer(initialState, addToFavoriteOffer.fulfilled(newFavoriteOffer, '', ''));

    expect(result).toEqual(expectedState);
  });

  // @-- removeToFavoriteOffer.fulfilled --@ //
  it('should remove a favorite offer from "data"', () => {
    const mockFavoriteOffers = Array.from({length: 10}, makeFakeOffers);
    const mockFavoriteOffer = mockFavoriteOffers[getRandomInteger(0, 10)];
    const mockFavoriteOfferIndex = mockFavoriteOffers.indexOf(mockFavoriteOffer);

    const initialState: FavoriteOffersProcess = {
      data: mockFavoriteOffers,
      status: DataStatus.Loaded,
    };
    const expectedState: FavoriteOffersProcess = {
      data: [
        ...mockFavoriteOffers.slice(0, mockFavoriteOfferIndex),
        ...mockFavoriteOffers.slice(mockFavoriteOfferIndex + 1)
      ],
      status: DataStatus.Loaded,
    };

    const result = favoriteReducer(initialState, removeToFavoriteOffer.fulfilled(mockFavoriteOffer, '', ''));
    expect(result).toEqual(expectedState);
  });

  // @-- logoutAction.fulfilled --@ //
  it('Should remove all favorite offers from state and set status to "unknown" with "logoutAction"', () => {
    const mockFavoriteOffers = Array.from({ length: 10 }, makeFakeOffers);
    const initialState = {
      data: mockFavoriteOffers,
      status: DataStatus.Loaded,
    };
    const expectedState = {
      data: [],
      status: DataStatus.Unknown,
    };
    const result = favoriteReducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
