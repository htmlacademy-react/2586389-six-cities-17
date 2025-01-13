import {AppState} from '../../types/state.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';

export const getAuthStatus = (state: AppState): AuthorizationStatus => state[NameSpace.Auth].status;
export const getUserName = (state: AppState): string | null => state[NameSpace.Auth].userInfo?.email || null;
export const getAvatarUrl = (state: AppState): string => state[NameSpace.Auth].userInfo?.avatarUrl || '';
