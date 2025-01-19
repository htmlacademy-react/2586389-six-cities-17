import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../../components/hooks';
import {useNavigate} from 'react-router-dom';
import {getAuthStatus} from '../../../store/auth-slice/auth-selector.ts';
import {AppRoute, AuthorizationStatus, BookmarkStatus} from '../../../const.ts';
import {addToFavoriteOffer, removeToFavoriteOffer} from '../../../store/api-actions.ts';

export interface BookmarkProps {
  isFavorite?: boolean;
  bookmarkButton: BookmarkStatus;
  offerId: string;
}

function Bookmark({isFavorite = false, offerId, bookmarkButton}: BookmarkProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthStatus);

  const buttonClass = classNames(
    `${bookmarkButton}__bookmark-button`,
    { 'place-card__bookmark-button--active': isFavorite && bookmarkButton === BookmarkStatus.PlacesCard },
    { 'offer__bookmark-button--active': isFavorite && bookmarkButton === BookmarkStatus.Offer },
    'button', 'type="button"'
  );

  const bookmarkW = bookmarkButton === BookmarkStatus.PlacesCard ? 18 : 31;
  const bookmarkH = bookmarkButton === BookmarkStatus.PlacesCard ? 19 : 33;

  const handleBookmarkClick = () => {
    if(authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    if(isFavorite) {
      dispatch(removeToFavoriteOffer(offerId));
    } else {
      dispatch(addToFavoriteOffer(offerId));
    }
  };

  return(
    <button className={buttonClass} type="button" onClick={handleBookmarkClick}>
      <svg className={`${bookmarkButton}__bookmark-icon`} width={bookmarkW} height={bookmarkH}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">${isFavorite ? 'In Bookmark' : 'To Bookmark'}</span>
    </button>
  );
}

export default Bookmark;
