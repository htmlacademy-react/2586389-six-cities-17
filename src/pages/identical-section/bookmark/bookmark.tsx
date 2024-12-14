import classNames from 'classnames';

export interface BookmarkProps {
  isFavorite?: boolean;
}

function Bookmark({isFavorite = false}: BookmarkProps): JSX.Element {
  const buttonClass = classNames('place-card__bookmark-button', {'place-card__bookmark-button--active':isFavorite}, 'button');

  return(
    <button className={buttonClass} type="button">
      <svg className="offer__bookmark-icon" width={31} height={33}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">${isFavorite ? 'In Bookmark' : 'To Bookmark'}</span>
    </button>
  );
}

export default Bookmark;
