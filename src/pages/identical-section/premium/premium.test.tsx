import {describe} from 'vitest';
import '@testing-library/jest-dom';
import {AuthorizationStatus, NameSpace} from '../../../const.ts';
import {render, screen} from '@testing-library/react';
import Premium from './premium.tsx';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import {makeFakeStore, makeFakeUserInfo} from '../../../utils/mocks/mocks.ts';
import * as router from 'react-router';

describe('Component: Premium', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
  });

  it('should render "Premium" when user is authorized and isPremium is true', () => {
    const expectedText = 'Premium';
    const isPremium = true;
    const premiumMarkTestId = 'premium-mark';

    const {withStoreComponent} = withStore(<Premium isPremium={isPremium}/>, makeFakeStore({
      [NameSpace.Auth]: {
        status: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserInfo(),
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const premiumMark = screen.getByTestId(premiumMarkTestId);
    expect(premiumMark).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "Premium" when user not authorized', () => {
    const expectedText = 'Premium';
    const isPremium = false;
    const premiumMarkTestId = 'premium-mark';

    const {withStoreComponent} = withStore(<Premium isPremium={isPremium}/>, makeFakeStore({
      [NameSpace.Auth]: {
        status: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserInfo(),
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const premiumMark = screen.queryByText(premiumMarkTestId);
    expect(premiumMark).not.toBeInTheDocument();
    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
  });
});
