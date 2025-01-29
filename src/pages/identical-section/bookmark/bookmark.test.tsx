import { render, screen } from '@testing-library/react';
import {describe} from 'vitest';
import '@testing-library/jest-dom';
import {withHistory, withStore} from '../../../utils/mocks-components/mocks-component.tsx';
import Bookmark from './bookmark.tsx';
import {makeFakeOffers, makeFakeStore} from '../../../utils/mocks/mocks.ts';
import {faker} from '@faker-js/faker';
import {AppRoute, AuthorizationStatus, BookmarkStatus, NameSpace} from '../../../const.ts';
import {browserHistory} from '../../../browser-history/browser-history.ts';
import {Provider} from 'react-redux';
import HistoryRouter from '../../../components/history-router/history-router.tsx';
import {userEvent} from '@testing-library/user-event';
import * as router from 'react-router';
const mockNavigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
});

describe('Component: SortForm', () => {
  it('Should render correctly', () => {
    const isFavoriteProps = faker.datatype.boolean();
    const offerIdProps = faker.string.nanoid();
    const bookmarkStatusProps = faker.helpers.arrayElement([
      BookmarkStatus.Offer,
      BookmarkStatus.PlacesCard,
    ]);

    const bookmarkButtonTestId = 'bookmark-button';

    const {withStoreComponent, mockStore} = withStore(
      <Bookmark
        isFavorite={isFavoriteProps}
        offerId={offerIdProps}
        bookmarkButton={bookmarkStatusProps}
      />,
      makeFakeStore()
    );

    // Затем используем mockStore в JSX
    render(
      <Provider store={mockStore}>
        <HistoryRouter history={browserHistory}>
          {withStoreComponent}
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(bookmarkButtonTestId)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Should dispatch "addToFavoritesAction" for not favorite offer when user click bookmark button if user is authorized',() => {
    const isFavoriteProps = true;
    const offerIdProps = faker.string.nanoid();
    const bookmarkStatusProps = faker.helpers.arrayElement([
      BookmarkStatus.Offer,
      BookmarkStatus.PlacesCard,
    ]);

    const bookmarkButtonTestId = 'bookmark-button';

    const fakeStoreWithAuthorizedStatus = makeFakeStore({
      [NameSpace.Auth]: {
        ...makeFakeStore()[NameSpace.Auth],
        status: AuthorizationStatus.NoAuth,
      },
    });

    const { withStoreComponent } = withStore(
      <Bookmark isFavorite={isFavoriteProps} offerId={offerIdProps} bookmarkButton={bookmarkStatusProps}/>,
      fakeStoreWithAuthorizedStatus
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(
      preparedComponent
    );

    expect(screen.getByTestId(bookmarkButtonTestId)).toBeInTheDocument();
  });

  it('Should dispatch "removeFromFavoritesAction" for favorite offer when user click bookmark button if user is authorized', async () => {
    const fakePlaceCardNotFavorite = { ...makeFakeOffers(), isFavorite: false };

    const isFavoriteProps = true;
    const offerIdProps = fakePlaceCardNotFavorite.id;
    const bookmarkStatusProps = faker.helpers.arrayElement([
      BookmarkStatus.Offer,
      BookmarkStatus.PlacesCard,
    ]);

    const fakeStoreWithAuthorizedStatus = makeFakeStore({
      [NameSpace.Auth]: {
        ...makeFakeStore()[NameSpace.Auth],
        status: AuthorizationStatus.Auth,
      },
    });

    const { withStoreComponent, mockStore } = withStore(
      <Bookmark isFavorite={isFavoriteProps} offerId={offerIdProps} bookmarkButton={bookmarkStatusProps}/>,
      fakeStoreWithAuthorizedStatus
    );

    const mockDispatch = vi.spyOn(mockStore, 'dispatch');
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByRole('button'));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Should dispatch "redirectToRoute" when user click bookmark button if user is not authorized', async () => {
    const fakePlaceCardNotFavorite = { ...makeFakeOffers(), isFavorite: false };

    const isFavoriteProps = false;
    const offerIdProps = fakePlaceCardNotFavorite.id;
    const bookmarkStatusProps = faker.helpers.arrayElement([
      BookmarkStatus.Offer,
      BookmarkStatus.PlacesCard,
    ]);

    const fakeStoreWithNoAuthorizedStatus = makeFakeStore({
      [NameSpace.Auth]: {
        ...makeFakeStore()[NameSpace.Auth],
        status: AuthorizationStatus.NoAuth,
      },
    });

    const { withStoreComponent, mockStore } = withStore(
      <Bookmark isFavorite={isFavoriteProps} offerId={offerIdProps} bookmarkButton={bookmarkStatusProps}/>,
      fakeStoreWithNoAuthorizedStatus
    );

    const mockDispatch = vi.spyOn(mockStore, 'dispatch');
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByRole('button'));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
  });
});
