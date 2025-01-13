import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthData, Offers, UserData} from '../types/types.ts';
import {APIRoute} from '../const.ts';
import {AppDispatch, AppState} from '../types/state.ts';
import {dropToken, saveToken} from '../services/token.ts';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();

export const fetchOffers = createAppAsyncThunk<Offers[], undefined>('offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers[]>(APIRoute.OffersApi);
    return data;
  }
);

export const checkAuthStatus = createAppAsyncThunk<UserData, undefined>('user/checkAuthStatus',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.LoginApi);
    return data;
  }
);

export const loginAction = createAppAsyncThunk<UserData, AuthData>('user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.LoginApi, {email, password});
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAppAsyncThunk<void, undefined>('user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.LogoutApi);
    dropToken();
  }
);
