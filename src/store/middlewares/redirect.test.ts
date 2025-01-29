import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { describe, it } from 'vitest';
import { browserHistory } from '../../browser-history/browser-history';
import { AppRoute } from '../../const';
import { AppState} from '../../types/state.ts';
import { redirectToRoute} from '../../utils/utlis.ts';
import { redirect } from './redirect';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<AppState, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('Should redirect to /login with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('Should not redirect to /favorites with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Favorites };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Favorites);
  });
});
