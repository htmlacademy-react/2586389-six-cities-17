import { render, screen } from '@testing-library/react';
import {describe, vi} from 'vitest';
import '@testing-library/jest-dom';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import CardOffer from './card-offer.tsx';
import {makeFakeOffers, makeFakeStore} from '../../../utils/mocks/mocks.ts';

describe('Component: CardOffer', () => {
  it('Should render correctly', () => {
    const mockCardOfferData = makeFakeOffers();
    const mockOnOfferCardMouseEnter = vi.fn();
    const mockOnOfferCardMouseLeave = vi.fn();

    const cardOfferElementTestId = 'card-offer-element';
    const ratingTestId = 'rating-element';

    const cardType = 'cities';
    const cardClassName = '';
    const imageWrapperClassName = '';

    const expectedImageAltText = 'Place image';
    const expectedPriceText = new RegExp(`${mockCardOfferData.price}`);
    const expectedTitle = mockCardOfferData.title;

    const {withStoreComponent} = withStore(
      <CardOffer
        offers={mockCardOfferData}
        onOfferCardMouseLeave={mockOnOfferCardMouseLeave}
        onOfferCardMouseEnter={mockOnOfferCardMouseEnter}
        cardType={cardType}
        cardClassName={cardClassName}
        imageWrapperClassName={imageWrapperClassName}
      />, makeFakeStore());

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(cardOfferElementTestId)).toBeInTheDocument();
    expect(screen.getByAltText(expectedImageAltText)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });
});
