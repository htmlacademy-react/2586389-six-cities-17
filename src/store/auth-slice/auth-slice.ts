import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const.ts';
import {checkAuthStatus, loginAction, logoutAction} from '../api-actions.ts';
import {AuthProcess} from '../../types/types.ts';
import {NameSpace} from '../../const.ts';

const initialState: AuthProcess = {
  status: AuthorizationStatus.Unknown,
  isErrorInAuthRequest: false,
  isErrorInCheckAuthRequest: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // @-- checkAuth --@ //
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isErrorInCheckAuthRequest = false;
        state.status = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = AuthorizationStatus.NoAuth;
        state.isErrorInCheckAuthRequest = true;
      })
      // @-- login --@ //
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isErrorInAuthRequest = false;
        state.status = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.status = AuthorizationStatus.NoAuth;
        state.isErrorInAuthRequest = true;
      })
      // @-- logout --@ //
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = AuthorizationStatus.NoAuth;
        state.isErrorInAuthRequest = false;
        state.userInfo = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.status = AuthorizationStatus.Auth;
      });
  }
});

export const authReducer = authSlice.reducer;
export default authSlice.reducer;
