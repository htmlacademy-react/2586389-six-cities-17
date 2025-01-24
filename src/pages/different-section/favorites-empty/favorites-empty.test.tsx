import { describe, it, expect } from 'vitest';
import {render, screen} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty.tsx';
import '@testing-library/jest-dom';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const descriptionElement = /Save properties to narrow down search or plan your future trips./;
    const statusElement = /Nothing yet saved./;

    render(<FavoritesEmpty />);

    expect(screen.getByText(descriptionElement)).toBeInTheDocument();
    expect(screen.getByText(statusElement)).toBeInTheDocument();
  });
});
