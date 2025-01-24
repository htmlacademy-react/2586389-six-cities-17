import {describe} from 'vitest';
import {createApi} from '../services/api.ts';
import {APIRoute} from '../const.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppState} from '../types/state.ts';
import {Action, PayloadAction} from '@reduxjs/toolkit';
import {AppThunkDispatch, makeFakeOfferExtended, makeFakeOffers, makeFakeReviews, makeFakeUserInfo} from '../utils/mocks/mocks.ts';
import {AuthData, OfferExtended, Offers, Reviews, UserData} from '../types/types.ts';
import {addToFavoriteOffer, checkAuthStatus, fetchNearPlacesOffers, fetchOfferReview, fetchOffers,
  getListOfFavoritesOffers, getOfferInfoById, loginAction, logoutAction, removeToFavoriteOffer} from './api-actions.ts';

describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ offers: { all: [] } });
    mockAxiosAdapter.reset();
  });

  describe('checkAuthStatus', () => {
    it('should dispatch "cheachAuthStatus.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      const mockUser: UserData = makeFakeUserInfo();
      mockAxiosAdapter.onGet(APIRoute.LoginApi).reply(200, mockUser);

      await store.dispatch(checkAuthStatus());

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(checkAuthStatus.pending.type);
      expect(actions[1].type).toBe(checkAuthStatus.fulfilled.type);
      expect(actions[1].payload).toEqual(mockUser);
    });

    it('should dispatch "checkAuthStatus.pending" and "checkAuthStatus.rejected" when API call fails', async () => {
      mockAxiosAdapter.onGet(APIRoute.LoginApi).reply(500);

      await store.dispatch(checkAuthStatus());

      const actions = store.getActions();
      expect(actions[0].type).toBe(checkAuthStatus.pending.type);
      expect(actions[1].type).toBe(checkAuthStatus.rejected.type);
    });
  });
  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" with thunk "loginAction"', async () => {
      const mockUser: UserData = makeFakeUserInfo();
      const mockAuthData: AuthData = { login: 'test@example.com', password: 'password123' };
      mockAxiosAdapter.onPost(APIRoute.LoginApi).reply(200, mockUser);

      await store.dispatch(loginAction(mockAuthData));

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(loginAction.pending.type);
      expect(actions[1].type).toBe(loginAction.fulfilled.type);
      expect(actions[1].payload).toEqual(mockUser);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" with thunk "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.LogoutApi).reply(204);

      await store.dispatch(logoutAction());

      const actions = store.getActions();
      expect(actions[0].type).toBe(logoutAction.pending.type);
      expect(actions[1].type).toBe(logoutAction.fulfilled.type);
    });
  });

  describe('fetchOffers', () => {
    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" with thunk "fetchOffers"', async () => {
      const mockOffers: Offers[] = [makeFakeOffers(), makeFakeOffers()];
      mockAxiosAdapter.onGet(APIRoute.OffersApi).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(fetchOffers.pending.type);
      expect(actions[1].type).toBe(fetchOffers.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffers);
    });
  });

  describe('getOfferInfoById', () => {
    it('should dispatch "getOfferInfoById.pending" and "getOfferInfoById.fulfilled" with thunk "getOfferInfoById"', async () => {
      const mockOffer: OfferExtended = makeFakeOfferExtended();
      const offerId = '1';
      mockAxiosAdapter.onGet(`${APIRoute.OffersApi}/${offerId}`).reply(200, mockOffer);

      await store.dispatch(getOfferInfoById(offerId));

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(getOfferInfoById.pending.type);
      expect(actions[1].type).toBe(getOfferInfoById.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffer);
    });
  });

  describe('fetchNearPlacesOffers', () => {
    it('should dispatch "fetchNearPlacesOffers.pending" and "fetchNearPlacesOffers.fulfilled" with thunk "fetchNearPlacesOffers"', async () => {
      const mockOffers: Offers[] = [makeFakeOffers(), makeFakeOffers()];
      const offerId = '1';
      mockAxiosAdapter.onGet(`${APIRoute.OffersApi}/${offerId}/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchNearPlacesOffers(offerId));

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(fetchNearPlacesOffers.pending.type);
      expect(actions[1].type).toBe(fetchNearPlacesOffers.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffers);
    });
  });

  describe('fetchOfferReview', () => {
    it('should dispatch "fetchOfferReview.pending" and "fetchOfferReview.fulfilled" with thunk "fetchOfferReview"', async () => {
      const mockReviews: Reviews[] = [makeFakeReviews(), makeFakeReviews()];
      const offerId = '1';
      mockAxiosAdapter.onGet(`/comments/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchOfferReview(offerId));

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(fetchOfferReview.pending.type);
      expect(actions[1].type).toBe(fetchOfferReview.fulfilled.type);
      expect(actions[1].payload).toEqual(mockReviews);
    });
  });

  describe('getListOfFavoritesOffers', () => {
    it('should dispatch "getListOfFavoritesOffers.pending" and "getListOfFavoritesOffers.fulfilled" with thunk "getListOfFavoritesOffers"', async () => {
      const mockOffers: Offers[] = [makeFakeOffers(), makeFakeOffers()];
      mockAxiosAdapter.onGet(APIRoute.FavoritesApi).reply(200, mockOffers);

      await store.dispatch(getListOfFavoritesOffers());

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(getListOfFavoritesOffers.pending.type);
      expect(actions[1].type).toBe(getListOfFavoritesOffers.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffers);
    });
  });

  describe('addToFavoriteOffer', () => {
    it('should dispatch "addToFavoriteOffer.pending" and "addToFavoriteOffer.fulfilled" with thunk "addToFavoriteOffer"', async () => {
      const mockOffer: Offers = makeFakeOffers();
      const offerId = '1';
      mockAxiosAdapter.onPost(`${APIRoute.FavoritesApi}/${offerId}/1`).reply(200, mockOffer);

      await store.dispatch(addToFavoriteOffer(offerId));

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(addToFavoriteOffer.pending.type);
      expect(actions[1].type).toBe(addToFavoriteOffer.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffer);
    });
  });

  describe('removeToFavoriteOffer', () => {
    it('should dispatch "removeToFavoriteOffer.pending" and "removeToFavoriteOffer.fulfilled" with thunk "removeToFavoriteOffer"', async () => {
      const mockOffer: Offers = makeFakeOffers();
      const offerId = '1';
      mockAxiosAdapter.onPost(`${APIRoute.FavoritesApi}/${offerId}/0`).reply(200, mockOffer);

      await store.dispatch(removeToFavoriteOffer(offerId));

      const actions = store.getActions() as PayloadAction<UserData>[];
      expect(actions[0].type).toBe(removeToFavoriteOffer.pending.type);
      expect(actions[1].type).toBe(removeToFavoriteOffer.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffer);
    });
  });
});
