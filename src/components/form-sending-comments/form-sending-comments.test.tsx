import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../utils/mocks-components/mocks-component.tsx';
import FormSendingComments from './form-sending-comments.tsx';
import {makeFakeStore, makeFakeUserInfo} from '../../utils/mocks/mocks.ts';
import {AuthorizationStatus, NameSpace} from '../../const.ts';
import '@testing-library/jest-dom';
import {faker} from '@faker-js/faker';

describe('Component: FormSendingComments', () => {
  it('should render correctly when user is authorized', () => {
    const expectedLabelText = 'Your review';
    const ratingTestId = 'review-rating';
    const textareaTestId = 'review-textarea';
    const expectedTextareaPlaceholderText = 'Tell how was your stay, what you like and what can be improved';
    const expectedButtonText = 'Submit';

    const {withStoreComponent} = withStore(<FormSendingComments />,makeFakeStore({
      [NameSpace.Auth]: {
        status: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserInfo(),
      }
    }));
    const withHistoryComponent = withHistory(withStoreComponent);
    render(withHistoryComponent);

    expect(screen.getByText(expectedLabelText)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
    expect(screen.getByTestId(textareaTestId)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(expectedTextareaPlaceholderText)).toBeInTheDocument();
    expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
  });

  it('should render correctly when user is not authorized', () => {
    const expectedLabelText = 'Your review';
    const ratingTestId = 'review-rating';
    const textareaTestId = 'review-textarea';
    const reviewsButtonWrapper = 'reviews-button-wrapper';
    const reviewSignInLinkTestId = 'review-sign-in-link';

    const {withStoreComponent} = withStore(<FormSendingComments />,makeFakeStore({
      [NameSpace.Auth]: {
        status: AuthorizationStatus.NoAuth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserInfo(),
      }
    }));
    const withHistoryComponent = withHistory(withStoreComponent);
    render(withHistoryComponent);

    expect(screen.getByText(expectedLabelText)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(textareaTestId)).not.toBeInTheDocument();
    expect(screen.queryByTestId(reviewsButtonWrapper)).not.toBeInTheDocument();
    expect(screen.getByTestId(reviewSignInLinkTestId)).toBeInTheDocument();
  });

  it('Should render correctly when user enter comment', async () => {
    const textareaTestId = 'review-textarea';
    const expectedCommentText = faker.lorem.lines(1);

    const {withStoreComponent} = withStore(<FormSendingComments />,makeFakeStore({
      [NameSpace.Auth]: {
        status: AuthorizationStatus.Auth,
        isErrorInAuthRequest: false,
        isErrorInCheckAuthRequest: false,
        userInfo: makeFakeUserInfo(),
      }
    }));
    const withHistoryComponent = withHistory(withStoreComponent);
    render(withHistoryComponent);

    await userEvent.type(
      screen.getByTestId(textareaTestId),
      expectedCommentText
    );

    expect(screen.getByDisplayValue(expectedCommentText)).toBeInTheDocument();
  });
});
