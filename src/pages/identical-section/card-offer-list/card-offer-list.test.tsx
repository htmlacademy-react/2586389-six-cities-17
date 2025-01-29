import { render, screen } from '@testing-library/react';
import {describe, vi} from 'vitest';
import '@testing-library/jest-dom';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import CardOfferList from './card-offer-list.tsx';
import {makeFakeOffers, makeFakeStore} from '../../../utils/mocks/mocks.ts';

describe('Component: CardOfferList', () => {
  it('Should render correctly', () => {
    const mockCardOfferData = Array.from({length: 10}, makeFakeOffers);
    const mockOnCardHover = vi.fn();

    const cardOfferListElementTestId = 'card-offer-list-element';

    const cardType = 'cities';
    const cardClassName = '';
    const imageWrapperClassName = '';

    const {withStoreComponent} = withStore(
      <CardOfferList
        offers={mockCardOfferData}
        onCardHover={mockOnCardHover}
        cardType={cardType}
        cardClassName={cardClassName}
        imageWrapperClassName={imageWrapperClassName}
      />, makeFakeStore());

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(cardOfferListElementTestId)).toBeInTheDocument();
  });
});
