import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';


export const getFavoriteOffers = (state: AppState) => state[NameSpace.Favorite].data;
