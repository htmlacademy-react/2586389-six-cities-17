import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import OfferHost from './offer-host.tsx';
import {makeFakeOfferExtended} from '../../../utils/mocks/mocks.ts';

describe('Component: OfferHost', () => {
  it('should render correctly', () => {
    const mockOfferHostData = makeFakeOfferExtended();
    const offerHostTestId = 'offer-host';

    render(<OfferHost offerExtended={mockOfferHostData} />);
    const offerHost = screen.getByTestId(offerHostTestId);

    expect(offerHost).toBeInTheDocument();
  });
});
