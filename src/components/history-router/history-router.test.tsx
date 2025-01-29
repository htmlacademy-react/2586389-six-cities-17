import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { describe } from 'vitest';
import HistoryRouter from './history-router';
import '@testing-library/jest-dom';
import {act} from 'react-dom/test-utils';

describe('Component: HistoryRouter', () => {
  it('Should render children correctly and handle navigation', async () => {
    const history = createMemoryHistory();
    const initialPath = '/';
    history.push(initialPath);

    const ChildComponent = () => <div>Child Component</div>;

    render(
      <HistoryRouter history={history}>
        <ChildComponent />
      </HistoryRouter>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();

    act(() => {
      history.push('/new-route');
    });

    await waitFor(() => expect(history.location.pathname).toBe('/new-route'));
  });
});
