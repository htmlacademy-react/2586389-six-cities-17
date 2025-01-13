import { NameSpace } from '../../const.ts';
import { AppState } from '../../types/state.ts';
import {Offers} from '../../types/types.ts';

export const getAllOffers = (state: AppState): Offers[] => state[NameSpace.OffersSpace].offers;
export const getOffersLoadingStatus = (state: AppState): boolean => state[NameSpace.OffersSpace].isLoading;
export const getOffersError = (state: AppState): string | null => state[NameSpace.OffersSpace].error;
export const getSelectedCity = (state: AppState): string => state[NameSpace.City].currentCity;

