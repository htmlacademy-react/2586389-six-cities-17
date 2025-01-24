import { describe, it, expect } from 'vitest';
import { AuthorizationStatus, NameSpace} from '../../../const.ts';
import { AppState} from '../../../types/state.ts';
import { getAuthStatus, getUserName, getAvatarUrl} from '../auth-selector.ts';
import { makeFakeUserInfo} from '../../../utils/mocks/mocks.ts';

describe('Auth selectors', () => {
  const state: AppState = {
    [NameSpace.Auth]: {
      status: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: makeFakeUserInfo(),
    },
  } as AppState;

  it('should return authorization status', () => {
    const { status } = state[NameSpace.Auth];
    const result = getAuthStatus(state);
    expect(result).toBe(status);
  });

  it('should return user email', () => {
    const { userInfo } = state[NameSpace.Auth];
    const result = getUserName(state);
    expect(result).toBe(userInfo?.email || null);
  });

  it('should return avatar URL', () => {
    const { userInfo } = state[NameSpace.Auth];
    const result = getAvatarUrl(state);
    expect(result).toBe(userInfo?.avatarUrl || '');
  });

  it('should return null for user email if userInfo is null', () => {
    const modifiedState: AppState = {
      ...state,
      [NameSpace.Auth]: {
        ...state[NameSpace.Auth],
        userInfo: null,
      },
    };
    const result = getUserName(modifiedState);
    expect(result).toBeNull();
  });

  it('should return empty string for avatar URL if userInfo is null', () => {
    const modifiedState: AppState = {
      ...state,
      [NameSpace.Auth]: {
        ...state[NameSpace.Auth],
        userInfo: null,
      },
    };
    const result = getAvatarUrl(modifiedState);
    expect(result).toBe('');
  });
});
