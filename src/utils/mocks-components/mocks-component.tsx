import {createMemoryHistory, MemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router.tsx';
import {HelmetProvider} from 'react-helmet-async';
import {AppState} from '../../types/state.ts';
import {createApi} from '../../services/api.ts';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppThunkDispatch} from '../mocks/mocks.ts';
import {Action} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return(
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

export function withStore(component: JSX.Element, initialState: Partial<AppState> = {}) {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter
  };
}
