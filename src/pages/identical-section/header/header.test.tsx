import {describe} from 'vitest';
import '@testing-library/jest-dom';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';
import {render, screen} from '@testing-library/react';
import Header from './header.tsx';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import {makeFakeStore, makeFakeUserInfo} from '../../../utils/mocks/mocks.ts';
import * as router from 'react-router';

describe('Component: Header', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  });

  it('should render correctly', () => {
    const headerContainerTestId = 'header-container';
    const {withStoreComponent} = withStore(<Header />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(headerContainerTestId)).toBeInTheDocument();
  });

  it('should render "Header" when user is authorize', () => {
    const signInLinkTestId = 'sign-in-link';
    const signOutATesteId = 'sign-out-a';
    const userInfoTestId = 'user-info';
    const {withStoreComponent, mockStore} = withStore(<Header />, makeFakeStore({
      [NameSpace.Auth]: {
        status: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserInfo(),
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const signInLink = screen.queryByText(signInLinkTestId);
    const signOutA = screen.getByTestId(signOutATesteId);
    const userInfo = screen.getByTestId(userInfoTestId);

    const actions = mockStore.getActions();
    expect(actions.some((action) => action.type === 'favorite/getListOfFavoritesOffers/pending')).toBe(false);

    expect(signInLink).not.toBeInTheDocument();
    expect(signOutA).toBeInTheDocument();
    expect(userInfo).toBeInTheDocument();
  });

  it('should render "Header" when user is not authorize', () => {
    const signInLinkTestId = 'sign-in-link';
    const signOutATesteId = 'sign-out-a';
    const userInfoTestId = 'user-info';
    const {withStoreComponent} = withStore(<Header />, makeFakeStore({
      [NameSpace.Auth]: {
        status: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserInfo(),
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const signInLink = screen.getByTestId(signInLinkTestId);
    const signOutA = screen.queryByText(signOutATesteId);
    const userInfo = screen.queryByText(userInfoTestId);

    expect(signInLink).toBeInTheDocument();
    expect(signOutA).not.toBeInTheDocument();
    expect(userInfo).not.toBeInTheDocument();
  });
});
