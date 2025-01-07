import {Offers} from './types/types.ts';
import {SORT_TYPE, SortType} from './variables/variables.tsx';

export enum AppRoute {
    Main = '/',
    Favorites = '/favorites',
    Offer = '/offer/:id',
    Login = '/login',
    NotFound = '*'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

const compareOffersPriceLow = (a:Offers, b: Offers) => a.price - b.price;
const compareOffersPriceHigh = (a:Offers, b: Offers) => b.price - a.price;
const compareOffersTopRated = (a:Offers, b: Offers) => b.rating - a.rating;

export const sortOffers = (offers: Offers[], sortingType: SortType): Offers[] => {
  switch (sortingType) {
    case SORT_TYPE.popular:
      return offers;
    case SORT_TYPE.price_low:
      return [...offers].sort(compareOffersPriceLow);
    case SORT_TYPE.price_high:
      return [...offers].sort(compareOffersPriceHigh);
    case SORT_TYPE.top_rated:
      return [...offers].sort(compareOffersTopRated);

    default:
      return offers;
  }
};
