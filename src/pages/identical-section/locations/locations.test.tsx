import {describe} from 'vitest';
import {withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Locations from './locations.tsx';
import {makeFakeCity, makeFakeStore} from '../../../utils/mocks/mocks.ts';
import {userEvent} from '@testing-library/user-event';

describe('Component: Login', () => {
  it('should render correctly', () => {
    const locationsContainerTestId = 'locations-container';
    const mockCities = Array.from({ length: 5 }, makeFakeCity); // Создаем 5 городов

    const { withStoreComponent } = withStore(
      <Locations cities={mockCities} onListOfferHover={() => {}} selectedCity={null} />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByTestId(locationsContainerTestId)).toBeInTheDocument();

    mockCities.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('Should call "onListOfferHover" when city is hovered', async () => {
    const mockCities = Array.from({ length: 5 }, makeFakeCity);
    const mockOnListOfferHover = vi.fn();

    const { withStoreComponent } = withStore(
      <Locations cities={mockCities} onListOfferHover={mockOnListOfferHover} selectedCity={null} />,
      makeFakeStore()
    );

    render(withStoreComponent);

    const cityElement = screen.getByText(mockCities[0].name);
    await userEvent.hover(cityElement);

    expect(mockOnListOfferHover).toHaveBeenCalledWith(mockCities[0].name);
  });

  it('Should add "tabs__item--active" class to the selected city', () => {
    const mockCities = Array.from({ length: 5 }, makeFakeCity);
    const selectedCity = mockCities[0].name;

    const { withStoreComponent } = withStore(
      <Locations cities={mockCities} onListOfferHover={() => {}} selectedCity={selectedCity} />,
      makeFakeStore()
    );

    render(withStoreComponent);

    const activeCityElement = screen.getByText(selectedCity).closest('a');
    expect(activeCityElement).toHaveClass('tabs__item--active');
  });
});
