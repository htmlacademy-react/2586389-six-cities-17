import { Link } from 'react-router-dom';
import Premium from '../../premium/premium';

function FavoritesPlaces(): JSX.Element {
  return(
    <div className="favorites__places">
      <article className="favorites__card place-card">
        <Premium />
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <Link to="#">
            <img
              className="place-card__image"
              src="img/apartment-small-03.jpg"
              width={150}
              height={110}
              alt="Place image"
            />
          </Link>
        </div>
        <div className="favorites__card-info place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€180</b>
              <span className="place-card__price-text">
            /&nbsp;night
              </span>
            </div>
            <button
              className="place-card__bookmark-button place-card__bookmark-button--active button"
              type="button"
            >
              <svg
                className="place-card__bookmark-icon"
                width={18}
                height={19}
              >
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: '100%' }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">Nice, cozy, warm big bed apartment</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    </div>
  );
}

export default FavoritesPlaces;
