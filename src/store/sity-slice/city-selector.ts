import { NameSpace } from '../../const.ts';
import { AppState } from '../../types/state.ts';

export const getSelectedCity = (state: AppState): string => state[NameSpace.City].currentCity;

