import {describe} from 'vitest';
import {makeFakeReviews} from '../../../utils/mocks/mocks.ts';
import ReviewsOffer from './reviews-offer.tsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Component: ReviewOffer', () => {
  it('should render correctly', () => {
    const reviews = makeFakeReviews();
    const reviewsTestId = 'reviews';

    render(
      <ReviewsOffer reviews={reviews} />
    );
    const review = screen.getByTestId(reviewsTestId);

    expect(review).toBeInTheDocument();
  });
});
