import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import NotFound from './not-found.tsx';
import '@testing-library/jest-dom';
import HistoryRouter from '../../../components/history-router/history-router.tsx';
import {browserHistory} from '../../../browser-history/browser-history.ts';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../../../store/root-reducer.ts';

const mockStore = configureStore({
  reducer: rootReducer,
});

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const expectedText1 = '404. Not found';
    const expectedText2 = 'You are on a non-existent page.';
    const expectedLink3 = 'Click to return to the main page';

    render(
      <Provider store={mockStore}> {/* Оберните в Provider */}
        <HelmetProvider>
          <HistoryRouter history={browserHistory}>
            <NotFound />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedLink3)).toBeInTheDocument();

  });
});
