import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import LoginLocation from './login-locations.tsx';
import '@testing-library/jest-dom';
import HistoryRouter from '../../../components/history-router/history-router.tsx';
import {browserHistory} from '../../../browser-history/browser-history.ts';

describe('Component: LoginLocations', () => {
  it('should render correctly', () => {
    const expectedText = /Amsterdam/i;

    render(
      <HistoryRouter history={browserHistory}>
        <LoginLocation />
      </HistoryRouter>
    );


    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
