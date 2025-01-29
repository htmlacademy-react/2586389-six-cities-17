import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withStore } from '../../../utils/mocks-components/mocks-component.tsx';
import { makeFakeCity, makeFakeOffers } from '../../../utils/mocks/mocks.ts';
import Map from './map.tsx';

describe('Component: Map', () => {
  it('should render correctly with city and offers', () => {
    const mockCity = makeFakeCity();
    const mockOffers = Array.from({ length: 5 }, makeFakeOffers);
    const mapTestId = 'map';

    const { withStoreComponent } = withStore(
      <Map city={mockCity} offers={mockOffers} selectedOffers={null} />,
      {}
    );

    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });

  it('should render correctly with selected offer', () => {
    const mockCity = makeFakeCity();
    const mockOffers = Array.from({ length: 5 }, makeFakeOffers);
    const mockSelectedOffer = mockOffers[0];
    const mapTestId = 'map';

    const { withStoreComponent } = withStore(
      <Map city={mockCity} offers={mockOffers} selectedOffers={mockSelectedOffer} />,
      {}
    );

    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });

  it('should render fallback when city or offers are not available', () => {
    const fallbackText = 'Map data is not available';
    const mockCity = makeFakeCity();

    const { withStoreComponent } = withStore(
      <Map city={mockCity} offers={[]} selectedOffers={null} />,
      {}
    );

    render(withStoreComponent);

    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });
});
