import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthData, OfferExtended, Offers, Reviews, UserData, ReviewsData} from '../types/types.ts';
import {APIRoute} from '../const.ts';
import {AppDispatch, AppState} from '../types/state.ts';
import {dropToken, saveToken} from '../services/token.ts';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();

//-- @OFFERS + --\\

export const fetchOffers = createAppAsyncThunk<Offers[], undefined>('offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers[]>(APIRoute.OffersApi);
    return data;
  }
);

// @-- AUTHSTATUS + --@ \\

export const checkAuthStatus = createAppAsyncThunk<UserData, undefined>('user/checkAuthStatus',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.LoginApi);
    return data;
  }
);

// @-- LOGIN + --@ \\

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

// @-- OFFER + --@ \\

export const getOfferInfoById = createAppAsyncThunk<OfferExtended, string>('offer/getOfferInfo',
  async(id, {extra: api}) => {
    const {data} = await api.get<OfferExtended>(`${APIRoute.OffersApi}/${id}`);
    return data;
  }
);

// @-- OFFER-nearby + --@ \\

export const fetchNearPlacesOffers = createAppAsyncThunk<Offers[], string>('offer/fetchNerabyOffers',
  async(id, {extra: api}) => {
    const {data} = await api.get<Offers[]>(`${APIRoute.OffersApi}/${id}/nearby`);
    return data;
  }
);

// @-- OFFER-reviews + --@ \\

export const fetchOfferReview = createAppAsyncThunk<Reviews[], string>('offer/fetchOfferComments',
  async(id, {extra: api}) => {
    const {data} = await api.get<Reviews[]>(`/comments/${id}`);
    return data;
  }
);

export const postReviewToOffer = createAppAsyncThunk<Reviews, ReviewsData>(
  'offer/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const {data} = await api.post<Reviews>(`${APIRoute.CommentsApi}/${offerId}`, {
      comment,
      rating,
    });

    dispatch(fetchOfferReview(offerId));
    return data;
  }
);


