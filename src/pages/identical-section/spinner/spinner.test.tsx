import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Spinner from './spinner.tsx';
import '@testing-library/jest-dom';
import HistoryRouter from '../../../components/history-router/history-router.tsx';
import { browserHistory } from '../../../browser-history/browser-history.ts';
import rootReducer from '../../../store/root-reducer.ts';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const mockStore = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={browserHistory}>
          <Spinner />
        </HistoryRouter>
      </Provider>
    );

    const expectedText = /Loading/i;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
