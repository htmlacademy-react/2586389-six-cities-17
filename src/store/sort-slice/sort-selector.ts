import { NameSpace } from '../../const.ts';
import { AppState } from '../../types/state.ts';

export const getCurrentSort = (state: AppState): string => state[NameSpace.Sort].currentSort;
