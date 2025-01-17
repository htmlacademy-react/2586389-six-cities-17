import { NameSpace } from '../../const';
import { AppState} from '../../types/state.ts';
import {OfferExtended} from '../../types/types.ts';

export const getOfferData = (state: AppState) => state[NameSpace.Offer].data || {} as OfferExtended;
export const getOfferStatus = (state: AppState) => state[NameSpace.Offer].status;
