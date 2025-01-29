import {describe} from 'vitest';
import Rating from './rating.tsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const testRating = 4.5; // Пример рейтинга
    const expectedWidth = `${Math.round(testRating) * 20}%`;
    const ratingStarsTestId = 'rating-stars';

    render(<Rating rating={testRating} />);

    const ratingValue = screen.getByText(testRating.toString());
    expect(ratingValue).toBeInTheDocument();

    const starsElement = screen.getByTestId(ratingStarsTestId);
    expect(starsElement).toHaveStyle(`width: ${expectedWidth}`);
  });
});
