import { describe, it, expect } from 'vitest';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {makeFakeOffers, makeFakeStore} from '../../../utils/mocks/mocks.ts';
import {DataStatus, NameSpace} from '../../../const.ts';
import {getRandomInteger} from '../../../utils/utlis.ts';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import Favorites from './favorites.tsx';

describe('Component: Favorites', () => {
  it('Should render correctly if there are favorite offers', () => {
    const favoritesPageTestId = 'favorites';
    const expectedHeadingText = 'Saved listing';
    const favoritesListTestId = 'favorites-list';
    const fakeStoreWithOffers = makeFakeStore({
      [NameSpace.Favorite]: {
        data: Array.from({ length: getRandomInteger(1, 120) }, makeFakeOffers),
        status: DataStatus.Unknown,
      }
    });

    const { withStoreComponent } = withStore(<Favorites />, fakeStoreWithOffers);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(favoritesPageTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
    expect(screen.getByTestId(favoritesListTestId)).toBeInTheDocument();
  });

  it('Should render correctly if there are no favorite offers', () => {
    const expectedHeadingText = 'Nothing yet saved.';
    const expectedText = 'Save properties to narrow down search or plan your future trips.';
    const fakeStoreWithNoOffers = makeFakeStore({
      [NameSpace.Favorite]: {
        data: [],
        status: DataStatus.Unknown,
      }
    });

    const { withStoreComponent } = withStore(<Favorites />, fakeStoreWithNoOffers);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
