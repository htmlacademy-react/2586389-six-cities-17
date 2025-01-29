import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import '@testing-library/jest-dom';
import {withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import SortingPlaces from './sorting-places.tsx';
import {extractActionsTypes, makeFakeStore} from '../../../utils/mocks/mocks.ts';
import {SortTypeList} from '../../../const.ts';
import {userEvent} from '@testing-library/user-event';

describe('Component: SortForm', () => {
  it('Should render correctly', () => {
    const sortFormTestId = 'sorting-places-form';
    const sortOptionTestId = 'sorting-places-option';
    const {withStoreComponent} = withStore(<SortingPlaces />, makeFakeStore());

    render(withStoreComponent);

    const sortForm = screen.getByTestId(sortFormTestId);
    const sortOptions = screen.getAllByTestId(sortOptionTestId);

    expect(sortForm).toBeInTheDocument();
    expect(sortOptions.length).toBe(Object.values(SortTypeList).length);
  });

  it('should dispatch changeSort on click sort item', async () => {
    const sortOptionTestId = 'sorting-places-option';
    const {withStoreComponent, mockStore} = withStore(<SortingPlaces />, makeFakeStore());

    render(withStoreComponent);
    const sortOptions = screen.getAllByTestId(sortOptionTestId);
    await userEvent.click(sortOptions[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual(['offers/changeSorting']);
  });
});
