/*import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import NotFound from './not-found.tsx';
import '@testing-library/jest-dom';
import HistoryRouter from '../../../components/history-router/history-router.tsx';
import {browserHistory} from '../../../browser-history/browser-history.ts';

describe('Component: LoginLocations', () => {
  it('should render correctly', () => {
    const expectedText = /404.NotFound/i;
    const expectedText1 = /404. Not found/i;
    const expectedText2 = /You are on a non-existent page./i;
    const expectedText3 = /Click to return to the main page/i;

    render(
      <HistoryRouter history={browserHistory}>
        <NotFound />
      </HistoryRouter>
    );


    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
    expect(screen.getByText(expectedText3)).toBeInTheDocument();

  });
});*/
