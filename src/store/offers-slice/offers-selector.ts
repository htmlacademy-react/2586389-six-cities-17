import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {Offers} from '../../types/types.ts';
import {SortType} from '../../const.ts';

export const getAllOffers = (state: AppState) => state[NameSpace.OffersSpace].all;
export const getSelectedCity = (state: AppState): string => state[NameSpace.OffersSpace].cityName;
export const getSortingType = (state: AppState): SortType => state[NameSpace.OffersSpace].sortingType;
export const getSortedOffers = (state: AppState): Offers[] => state[NameSpace.OffersSpace].sorted;
