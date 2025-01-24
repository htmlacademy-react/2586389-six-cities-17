import {Offers, Reviews} from '../../types/types.ts';
import {faker} from '@faker-js/faker';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {AppState} from '../../types/state.ts';
import {createApi} from '../../services/api.ts';
import {getOffersByCityName, getRandomInteger} from '../utlis.ts';
import {UserData} from '../../types/types.ts';
import {AuthProcess} from '../../types/types.ts';
import {AuthorizationStatus, DataStatus, NameSpace, PostingStatus} from '../../const.ts';
import {DefCityLocation, DefCityName, SortTypeList} from '../../variables/variables.tsx';

export const makeFakeOffers = ():Offers => ({
  id: faker.string.nanoid(),
  title: faker.string.alpha(),
  type: faker.string.alpha(),
  price: faker.number.int(),
  city: {
    name: faker.location.city(),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      zoom: faker.number.int()
    }
  },
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    zoom: faker.number.int()
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.number.int(),
  previewImage: faker.system.filePath()
});

export const makeFakeOffersForCity = (cityName: string): Offers => ({
  ...makeFakeOffers(),
  city: {
    ...makeFakeOffers().city,
    name: cityName
  }
});

export const makeFakeReviews = (): Reviews => ({
  id: faker.string.nanoid(),
  comment: faker.string.alpha(),
  date: faker.string.numeric(),
  rating: faker.number.int(),
  user: {
    name: faker.person.firstName(),
    avatarUrl: faker.system.filePath(),
    isPro: faker.datatype.boolean(),
  },
});

export const makeFakeReviewData = () => ({
  comment: faker.string.alpha(),
  rating: faker.number.int(),
  offerId: faker.string.nanoid(),
});

export const makeFakeImages = (): string[] => Array.from({ length: getRandomInteger(6, 10) }, () => faker.system.filePath());


export const makeFakeOfferExtended = () => ({
  id: faker.string.nanoid(),
  title: faker.string.alpha(),
  type: faker.string.alpha(),
  price: faker.number.int(),
  city: {
    name: faker.location.city(),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      zoom: faker.number.int()
    }
  },
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    zoom: faker.number.int()
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.number.int(),
  description: faker.string.alpha(),
  images: makeFakeImages(),
  goods: Array.from({ length: getRandomInteger(0, 10) }, () => faker.string.alpha()),
  host: {
    isPro: faker.datatype.boolean(),
    name: faker.person.firstName(),
    avatarUrl: faker.string.alpha(),
  },
  bedrooms: faker.number.int(),
  maxAdults: faker.number.int(),
});

export const makeFakeUserInfo = (): UserData => ({
  email: faker.internet.email(),
  token: faker.string.uuid(),
  name: faker.person.firstName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  offerId: faker.string.uuid(),
  status: faker.number.int({ min: 200, max: 204 }),
});

export const makeFakeAuthState = (): AuthProcess => ({
  status: faker.helpers.arrayElement([
    AuthorizationStatus.Auth,
    AuthorizationStatus.NoAuth,
    AuthorizationStatus.Unknown,
  ]),
  isErrorInAuthRequest: faker.datatype.boolean(),
  isErrorInCheckAuthRequest: faker.datatype.boolean(),
  userInfo: faker.datatype.boolean() ? makeFakeUserInfo() : null, // Иногда userInfo может быть null
});

export type AppThunkDispatch = ThunkDispatch<AppState, ReturnType<typeof createApi>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<AppState>): AppState => {
  const mockOffers = Array.from({length: 120}, makeFakeOffers);
  const mockReviews = Array.from({length: 120}, makeFakeReviews);

  return {
    [NameSpace.OffersSpace]: {
      cityName: DefCityName,
      cityLocation: DefCityLocation,
      all: mockOffers,
      sorted: getOffersByCityName(mockOffers, DefCityName),
      sortingType: SortTypeList.popular,
      status: DataStatus.Unknown,
    },
    [NameSpace.Auth]: {
      status: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: makeFakeUserInfo(),
    },
    [NameSpace.Offer]: {
      data: makeFakeOfferExtended(),
      status: DataStatus.Unknown,
      isOfferDataLoading: false,
      isErrorInOfferDataLoading: false,
    },
    [NameSpace.Reviews]: {
      data: mockReviews,
      status: DataStatus.Unknown,
      postingStatus: PostingStatus.Unknown,
    },
    [NameSpace.NearPlaces]: {
      data: mockOffers,
      status: DataStatus.Unknown,
    },
    [NameSpace.Favorite]: {
      data: mockOffers,
      status: DataStatus.Unknown,
    },
    ...initialState ?? {},
  };
};
