import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import {makeFakeLocation, makeFakeStore} from '../../../utils/mocks/mocks.ts';
import Main from './main.tsx';
import {DataStatus, NameSpace} from '../../../const.ts';
import {SortTypeList} from '../../../const.ts';

describe('Component: Main', () => {
  it('should render correctly if there are offers', () => {
    const mainTestId = 'main';
    const expectedHeadingText = 'Cities';

    const { withStoreComponent } = withStore(<Main/>, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(mainTestId));
    expect(screen.getByText(expectedHeadingText));
  });

  it('should render correctly if there are no offers', () => {
    const mainTestId = 'main';
    const expectedText = 'No places to stay available';
    const fakeStore = makeFakeStore();
    const fakeStoreWithNoOffers = {
      ...fakeStore,
      [NameSpace.OffersSpace]: {
        all: [],
        sorted: [],
        cityName: '',
        cityLocation: makeFakeLocation(),
        sortingType: SortTypeList.popular,
        status: DataStatus.Unknown
      }
    };

    const { withStoreComponent } = withStore(<Main/>, fakeStoreWithNoOffers);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(mainTestId));
    expect(screen.getByText(expectedText));
  });
});
