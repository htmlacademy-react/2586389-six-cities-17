import {describe} from 'vitest';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import Login from './login.tsx';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

describe('Component: Login', () => {
  it('should render correctly', () => {
    const signInText = 'Sign in';
    const emailText = 'E-mail';
    const passwordText = 'Password';
    const { withStoreComponent} = withStore(<Login />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByText(signInText)).toHaveLength(2);
    expect(screen.getByText(emailText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const expectedLoginValue = 'camelliya';
    const expectedPasswordValue = '123456';
    const emailInputTestId = 'email-input';
    const passworInputTestId = 'password-input';
    const { withStoreComponent} = withStore(<Login />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(emailInputTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passworInputTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
