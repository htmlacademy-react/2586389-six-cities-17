import {describe} from 'vitest';
import {makeFakeReviews} from '../../../utils/mocks/mocks.ts';
import ReviewsOfferList from './reviews-offer-list.tsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import {makeFakeStore} from '../../../utils/mocks/mocks.ts';

describe('Component: ReviewOfferList', () => {
  it('should render correctly', () => {
    const mockReviews = Array.from({length: 10}, makeFakeReviews);
    const reviewsTestId = 'reviews-offer';
    const expectedHeadingText = /Reviews ·/i;

    const {withStoreComponent} = withStore(<ReviewsOfferList reviews={mockReviews} />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(reviewsTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
  });
});
