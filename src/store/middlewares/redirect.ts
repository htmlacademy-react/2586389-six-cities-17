import { PayloadAction } from '@reduxjs/toolkit';
import { browserHistory } from '../../browser-history/browser-history';
import { Middleware } from 'redux';
import rootReducer from '../root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, RootState> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'navigation/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
