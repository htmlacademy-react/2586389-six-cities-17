import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
//import {loadOffers, setOffersLoadingStatus} from './actions.ts';
import {Offers} from '../types/types.ts';
import {APIRoute} from '../const.ts';
import {AppDispatch, AppState} from '../types/state.ts';

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
