import { StatusCodes } from 'http-status-codes';
import {Offers} from './types/types.ts';
import {City} from './types/types.ts';

export enum AppRoute {
    Main = '/',
    Favorites = '/favorites',
    Offer = '/offer/:id',
    Login = '/login',
    NotFound = '*'
}

export enum APIRoute {
  OffersApi = '/offers',
  LoginApi = '/login',
  LogoutApi = '/logout',
  FavoritesApi = '/favorite',
  CommentsApi = '/comments',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum DataStatus {
  Unknown = 'unknown',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

export enum PostingStatus {
  Unknown = 'unknown',
  Posting = 'posting',
  Posted = 'posted',
  Error = 'error',
}

export enum NameSpace {
  Auth = 'auth',
  OffersSpace = 'offers',
  Offer = 'offer',
  NearPlaces = 'nearPlaces',
  Reviews = 'reviews',
  Favorite = 'favorite',
}

export enum BookmarkStatus {
  Offer = 'offer',
  PlacesCard = 'place-card',
}

export const SortTypeList = {
  popular: 'Popular',
  priceLow: 'Price: low to high',
  priceHigh: 'Price: high to low',
  topRated: 'Top rated first',
};

export const MinLengthOfReview = 50;
export const MaxLengthOfReview = 300;

export const NearPlacesOffersAmount = 3;

export const DefCityName = 'Paris';
export const DefCityLocation = {
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 13
};

export const MarkerInfo = {
  UrlDef: 'img/pin.svg',
  UrlAct: 'img/pin-active.svg',
  Width: 28,
  Height: 40,
  Left: 14,
  Top: 40
} as const;

export const RatingsStars = [
  {
    value: 5,
    title: 'perfect',
  },
  {
    value: 4,
    title: 'good',
  },
  {
    value: 3,
    title: 'not bad',
  },
  {
    value: 2,
    title: 'badly'
  },
  {
    value: 1,
    title: 'terribly'
  }
];

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

export const BackendUrl = 'https://16.design.htmlacademy.pro/six-cities';
export const RequestTimeout = 5000;

export type SortType = typeof SortTypeList[keyof typeof SortTypeList]

export const UpdateFavoriteStatus = (offers: Offers[], payload: Offers, isFavorite: boolean) =>
  offers.map((offer) => offer.id === payload.id ? { ...offer, isFavorite } : offer);

export const Cities: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9375,
      longitude: 6.9603,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8503,
      longitude: 4.3517,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 13,
    },
  },
];

export const LOCATIONS: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];
