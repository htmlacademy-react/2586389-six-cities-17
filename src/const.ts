import {Offers} from './types/types.ts';
import {SortTypeList, SortType} from './variables/variables.tsx';

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
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum LoginStatus {
  Unknown = 'unknown',
  Processing = 'processing',
  LoggedIn = 'logged-in',
  Error = 'error',
}

export enum NameSpace {
  Auth = 'auth',
  City = 'city',
  OffersSpace = 'offers',
  Offer = 'offer',
  NearPlaces = 'near_places',
  Reviews = 'reviews',
  FavoriteOffers = 'favorite_offers',
  Sort = 'sort',
}

const compareOffersPriceLow = (a:Offers, b: Offers) => a.price - b.price;
const compareOffersPriceHigh = (a:Offers, b: Offers) => b.price - a.price;
const compareOffersTopRated = (a:Offers, b: Offers) => b.rating - a.rating;

export const sortOffers = (offers: Offers[], sortingType: SortType): Offers[] => {
  switch (sortingType) {
    case SortTypeList.popular:
      return offers;
    case SortTypeList.priceLow:
      return [...offers].sort(compareOffersPriceLow);
    case SortTypeList.priceHigh:
      return [...offers].sort(compareOffersPriceHigh);
    case SortTypeList.topRated:
      return [...offers].sort(compareOffersTopRated);

    default:
      return offers;
  }
};
