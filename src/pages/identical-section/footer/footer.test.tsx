import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryRouter from '../../../components/history-router/history-router.tsx';
import {browserHistory} from '../../../browser-history/browser-history.ts';
import Footer from './footer.tsx';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={browserHistory}>
        <Footer />
      </HistoryRouter>
    );

    const expectedImg = screen.getByRole('img', { name: /6 cities logo/i });
    expect(expectedImg).toBeInTheDocument();
  });
});
