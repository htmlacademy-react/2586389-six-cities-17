import { AuthorizationStatus} from '../../../const.ts';
import { makeFakeUserInfo} from '../../../utils/mocks/mocks.ts';
import { AuthProcess} from '../../../types/types.ts';
import { checkAuthStatus, loginAction, logoutAction} from '../../api-actions.ts';
import { authReducer} from '../auth-slice.ts';

describe('Auth Slice', () => {
  // @-- initial state with empty action --@ //
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };

    const result = authReducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @--  default initial state with empty action and undefined --@ //
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };

    const result = authReducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  // @-- checkAuthStatus.fulfilled --@ //
  it('should set "Auth" with "checkAuthStatus.fulfilled" action', () => {
    const fakeUser = makeFakeUserInfo();
    const initialState: AuthProcess = {
      status: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: fakeUser,
    };

    const result = authReducer(initialState, checkAuthStatus.fulfilled(fakeUser, '', undefined));
    expect(result).toEqual(expectedState);
  });

  // @-- checkAuthStatus.rejected --@ //
  it('should set "NoAuth" with "checkAuthStatus.rejected" action', () => {
    const initialState: AuthProcess = {
      status: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.NoAuth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: true,
      userInfo: null,
    };

    const result = authReducer(initialState, checkAuthStatus.rejected);
    expect(result).toEqual(expectedState);
  });

  // @-- loginAction.fulfilled --@ //
  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const fakeUser = makeFakeUserInfo();
    const initialState: AuthProcess = {
      status: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: fakeUser,
    };

    const result = authReducer(initialState, loginAction.fulfilled(fakeUser, '', {
      login: '',
      password: '',
    }));
    expect(result).toEqual(expectedState);
  });

  // @-- loginAction.rejected --@ //
  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState: AuthProcess = {
      status: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.NoAuth,
      isErrorInAuthRequest: true,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };

    const result = authReducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  // @-- logoutAction.fulfilled --@ //
  it('should set "NoAuth" with "logoutAction.fulfilled" action', () => {
    const initialState: AuthProcess = {
      status: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: makeFakeUserInfo(),
    };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.NoAuth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null,
    };

    const result = authReducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  // @-- logoutAction.rejected --@ //
  it('should set "NoAuth" with "logoutAction.rejected" action', () => {
    const initialState: AuthProcess = {
      status: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: makeFakeUserInfo(),
    };
    const expectedState: AuthProcess = {
      status: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: initialState.userInfo,
    };

    const result = authReducer(initialState, logoutAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
