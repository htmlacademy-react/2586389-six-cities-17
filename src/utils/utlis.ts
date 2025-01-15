import {Offers} from '../types/types.ts';
import {SortType, SortTypeList} from '../variables/variables.tsx';

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
