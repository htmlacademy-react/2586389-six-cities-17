import { NameSpace } from '../../const';
import { AppState} from '../../types/state.ts';
import {OfferExtended} from '../../types/types.ts';
import {createSelector} from 'reselect';

export const getOfferState = (state: AppState) => state[NameSpace.Offer];

export const getOfferData = createSelector(
  [getOfferState],
  (offerState) => offerState.data || {} as OfferExtended
);

export const getOfferStatus = (state: AppState) => state[NameSpace.Offer].status;
