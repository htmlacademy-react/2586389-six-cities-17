import {describe} from 'vitest';
import {NearPlacesProcess} from '../../../types/types.ts';
import {DataStatus} from '../../../const.ts';
import {addToFavoriteOffer, fetchNearPlacesOffers, logoutAction, removeToFavoriteOffer} from '../../api-actions.ts';
import {makeFakeOffers} from '../../../utils/mocks/mocks.ts';
import {getRandomInteger} from '../../../utils/utlis.ts';
import {nearPlacesReducer} from '../near-places-slice.ts';
import {faker} from '@faker-js/faker';
import {UpdateFavoriteStatus} from '../../../const.ts';

describe('NearPlaces Slice', () => {
  const emptyAction = { type: '' };

  // @-- initial state with empty action --@ //
  it('should return initial state with empty action', () => {
    const expectedState: NearPlacesProcess = {
      data: [],
      status: DataStatus.Unknown,
    };

    const result = nearPlacesReducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @--  default initial state with empty action and undefined --@ //
  it('should return default initial state with empty action and undefined', () => {
    const expectedState: NearPlacesProcess = {
      data: [],
      status: DataStatus.Unknown,
    };

    const result = nearPlacesReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @-- fetchNearPlacesOffers.pending --@ //
  it('should set "status" to "loading" with "fetchNearPlacesOffers.pending"', () => {
    const initialState: NearPlacesProcess = {
      data: [],
      status: DataStatus.Unknown,
    };
    const expectedState: NearPlacesProcess = {
      data: [],
      status: DataStatus.Loading,
    };

    const result = nearPlacesReducer(initialState, fetchNearPlacesOffers.pending);
    expect(result).toEqual(expectedState);
  });

  // @-- fetchNearPlacesOffers.fulfilled --@ //
  it('should set "status" to "loading" with "fetchNearPlacesOffers.fulfilled"', () => {
    const mockNearPlaces = Array.from({length: 3}, makeFakeOffers);
    const mockOfferId = faker.string.nanoid();

    const expectedState: NearPlacesProcess = {
      data: mockNearPlaces,
      status: DataStatus.Loaded,
    };

    const result = nearPlacesReducer(undefined, fetchNearPlacesOffers.fulfilled(mockNearPlaces, mockOfferId, ''));
    expect(result).toEqual(expectedState);
  });

  // @-- fetchNearPlacesOffers.rejected --@ //
  it('Should set status to "error" with "fetchNearPlacesOffers.rejected"', () => {
    const expectedState: NearPlacesProcess = {
      data: [],
      status: DataStatus.Error,
    };
    const result = nearPlacesReducer(undefined, fetchNearPlacesOffers.rejected);
    expect(result).toEqual(expectedState);
  });

  // @-- fetchNearPlacesOffers.rejected --@ //
  it('Should update favorite offers with "addToFavoriteOffer.fulfilled"', () => {
    const mockNearPlaces = Array.from({ length: 10 }, makeFakeOffers);
    const mockNearPlace = mockNearPlaces[getRandomInteger(0, 10)];

    const initialState: NearPlacesProcess = {
      data: mockNearPlaces,
      status: DataStatus.Unknown,
    };

    const expectedState: NearPlacesProcess = {
      data: UpdateFavoriteStatus(mockNearPlaces, mockNearPlace, true),
      status: DataStatus.Unknown,
    };
    const result = nearPlacesReducer(initialState, addToFavoriteOffer.fulfilled(mockNearPlace, mockNearPlace.id, ''));
    expect(result).toEqual(expectedState);
  });

  // @-- removeFromFavoritesAction.fulfilled --@ //
  it('Should update favorite offers with "removeFromFavoritesAction.fulfilled"', () => {
    const mockNearPlaces = Array.from({ length: 10 }, makeFakeOffers);
    const mockNearPlace = mockNearPlaces[getRandomInteger(0, 10)];

    const initialState: NearPlacesProcess = {
      data: mockNearPlaces,
      status: DataStatus.Unknown,
    };

    const expectedState: NearPlacesProcess = {
      data: UpdateFavoriteStatus(mockNearPlaces, mockNearPlace, false),
      status: DataStatus.Unknown,
    };
    const result = nearPlacesReducer(initialState, removeToFavoriteOffer.fulfilled(mockNearPlace, mockNearPlace.id, ''));
    expect(result).toEqual(expectedState);
  });

  // @-- logoutAction.fulfilled --@ //
  it('should remove favorite status from all near places with "logoutAction.fulfilled"', () => {
    const mockNearPlaces = Array.from({ length: 10 }, makeFakeOffers);
    const initialState: NearPlacesProcess = {
      data: mockNearPlaces,
      status: DataStatus.Unknown,
    };
    const expectedState: NearPlacesProcess = {
      data: mockNearPlaces.map((offer) => ({ ...offer, isFavorite: false })),
      status: DataStatus.Unknown,
    };
    const result = nearPlacesReducer(initialState, logoutAction.fulfilled(undefined, '', undefined));
    expect(result).toEqual(expectedState);
  });
});
