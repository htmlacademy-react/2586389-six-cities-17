import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import MainEmpty from './main-empty.tsx';
import '@testing-library/jest-dom';
import {withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import {makeFakeStore} from '../../../utils/mocks/mocks.ts';
//Почему, если я не прописываю эту библиотеку, то он выдаёт мне ошибку: Error: Invalid Chai property: toBeInTheDocument

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const expectedText = /No places to stay available/i;
    const expectedText2 = /We could not find any property available at the moment in/i;
    const {withStoreComponent} = withStore(<MainEmpty/>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
  });
});
