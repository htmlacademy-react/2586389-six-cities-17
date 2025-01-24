import {describe} from 'vitest';
import {makeFakeOffers, makeFakeOffersForCity} from '../../../utils/mocks/mocks.ts';
import {
  DefCityLocation,
  DefCityName,
  SortTypeList,
  LOCATIONS,
  UpdateFavoriteStatus
} from '../../../variables/variables.tsx';
import {DataStatus} from '../../../const.ts';
import {changeCity, offersReducer, changeSorting} from '../offers-slice.ts';
import {defineCityLocation, getOffersByCityName, sortOffers} from '../../../utils/utlis.ts';
import {addToFavoriteOffer, fetchOffers, removeToFavoriteOffer} from '../../api-actions.ts';


describe('OffersProcess Slice', () => {
  const emptyAction = { type: '' };

  it('Should return initial state with empty action', () => {
    const expectedState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: Array.from({ length: 120 }, makeFakeOffers),
      sorted: Array.from({ length: 20 }, makeFakeOffers),
      sortingType: SortTypeList.popular,
      status: DataStatus.Unknown,
    };
    const result = offersReducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action and undefined state', () => {
    const expectedState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: [],
      sorted: [],
      sortingType: SortTypeList.popular,
      status: DataStatus.Unknown,
    };
    const result = offersReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Should change city with changeCity action', () => {
    const mockOffers = [
      ...Array.from({ length: 100 }, () => makeFakeOffersForCity(DefCityName)),
      ...Array.from({ length: 20 }, () => makeFakeOffersForCity(LOCATIONS[1])),
    ];

    const initialState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: mockOffers,
      sorted: getOffersByCityName(mockOffers, DefCityName),
      sortingType: SortTypeList.popular,
      status: DataStatus.Unknown,
    };
    const expectedState = {
      cityName: LOCATIONS[1],
      cityLocation: defineCityLocation(getOffersByCityName(mockOffers, LOCATIONS[1])),
      all: mockOffers,
      sorted: getOffersByCityName(mockOffers, LOCATIONS[1]),
      sortingType: SortTypeList.popular,
      status: DataStatus.Unknown,
    };
    const result = offersReducer(initialState, changeCity(LOCATIONS[1]));
    expect(result).toEqual(expectedState);
  });

  it('Should change sorting type with changeSortingType action', () => {
    const fakeOffers = [
      ...Array.from({ length: 100 }, () => makeFakeOffersForCity(DefCityName)),
      ...Array.from({ length: 20 }, () => makeFakeOffersForCity(LOCATIONS[1])),
    ];

    const initialState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: fakeOffers,
      sorted: getOffersByCityName(fakeOffers, DefCityName),
      sortingType: SortTypeList.popular,
      status: DataStatus.Unknown,
    };

    const expectedState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: fakeOffers,
      sorted: sortOffers(getOffersByCityName(fakeOffers, DefCityName), SortTypeList.priceHigh),
      sortingType: SortTypeList.priceHigh,
      status: DataStatus.Unknown,
    };

    const result = offersReducer(initialState, changeSorting(SortTypeList.priceHigh));

    expect(result).toEqual(expectedState);
  });

  it('Should set "status" to "loading" with "fetchOffers.pending"', () => {
    const expectedState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: [],
      sorted: [],
      sortingType: SortTypeList.popular,
      status: DataStatus.Loading,
    };

    const result = offersReducer(undefined, fetchOffers.pending);
    expect(result).toEqual(expectedState);
  });

  it('Should set "status" to "loaded", "all" to array with all offers, "sorted" to array with offers by city, "cityLocation" to location object with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = [
      ...Array.from({ length: 100 }, () => makeFakeOffersForCity(DefCityName)),
      ...Array.from({ length: 20 }, () => makeFakeOffersForCity(DefCityName)),
    ];

    const mockSortedOffers = getOffersByCityName(mockOffers, DefCityName);

    const expectedState = {
      cityName: DefCityName,
      cityLocation: defineCityLocation(mockSortedOffers),
      all: mockOffers,
      sorted: mockSortedOffers,
      sortingType: SortTypeList.popular,
      status: DataStatus.Loaded,
    };

    const result = offersReducer(undefined, fetchOffers.fulfilled(mockOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Should set "status" to "error" with "fetchOffers.rejected", ', () => {
    const expectedState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: [],
      sorted: [],
      sortingType: SortTypeList.popular,
      status: DataStatus.Error,
    };

    const result = offersReducer(undefined, fetchOffers.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Should update all offers and sorted offers with "addToFavoriteOffer.fulfilled"', () => {
    const mockOffers = [
      ...Array.from({ length: 100 }, () => makeFakeOffersForCity(DefCityName)),
      ...Array.from({ length: 20 }, () => makeFakeOffersForCity(DefCityName)),
    ];
    const mockPayload = mockOffers[0];
    const mockUpdatedOffers = UpdateFavoriteStatus(mockOffers, mockPayload, true);

    const mockSortedOffers = getOffersByCityName(mockOffers, DefCityName);
    const mockUpdatedSortedOffers = getOffersByCityName(mockUpdatedOffers, DefCityName);


    const initialState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: mockOffers,
      sorted: mockSortedOffers,
      sortingType: SortTypeList.popular,
      status: DataStatus.Loaded,
    };

    const expectedState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: mockUpdatedOffers,
      sorted: mockUpdatedSortedOffers,
      sortingType: SortTypeList.popular,
      status: DataStatus.Loaded,
    };

    const result = offersReducer(initialState, addToFavoriteOffer.fulfilled(mockPayload, mockPayload.id, ''));

    expect(result).toEqual(expectedState);
  });

  it('Should update all offers and sorted offers with "removeToFavoriteOffer.fulfilled"', () => {
    const mockOffers = [
      ...Array.from({ length: 100 }, () => makeFakeOffersForCity(DefCityName)),
      ...Array.from({ length: 20 }, () => makeFakeOffersForCity(DefCityName)),
    ];
    const mockPayload = mockOffers[0];
    const mockUpdatedOffers = UpdateFavoriteStatus(mockOffers, mockPayload, false);

    const mockSortedOffers = getOffersByCityName(mockOffers, DefCityName);
    const mockUpdatedSortedOffers = getOffersByCityName(mockUpdatedOffers, DefCityName);


    const initialState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: mockOffers,
      sorted: mockSortedOffers,
      sortingType: SortTypeList.popular,
      status: DataStatus.Loaded,
    };

    const expectedState = {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: mockUpdatedOffers,
      sorted: mockUpdatedSortedOffers,
      sortingType: SortTypeList.popular,
      status: DataStatus.Loaded,
    };

    const result = offersReducer(initialState, removeToFavoriteOffer.fulfilled(mockPayload, mockPayload.id, ''));

    expect(result).toEqual(expectedState);
  });
});
