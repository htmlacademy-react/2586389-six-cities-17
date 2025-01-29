import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import {makeFakeStore} from '../../../utils/mocks/mocks.ts';
import Offer from './offer.tsx';

describe('Component: Offer', () => {
  it('should render correctly', () => {
    const offerTestId = 'offer';
    const nearPlacesText = 'Other places in the neighbourhood';

    const { withStoreComponent } = withStore(<Offer/>, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(offerTestId)).toBeInTheDocument();
    expect(screen.getByText(nearPlacesText));
  });
});
