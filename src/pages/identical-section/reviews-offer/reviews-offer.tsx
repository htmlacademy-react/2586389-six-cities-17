import {Reviews} from '../../../types/types.ts';

interface ReviewsOfferProps {
  reviews: Reviews;
}

function ReviewsOffer({reviews}: ReviewsOfferProps):JSX.Element {
  const {comment, date, rating, user} = reviews;

  return (
    <ul className="reviews__list" data-testid="reviews">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={user.avatarUrl}
              width={54}
              height={54}
              alt="Reviews avatar"
            />
          </div>
          <span className="reviews__user-name">{user.name}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{ width: `${rating * 20}%` }}/>
              <span className="visually-hidden">{rating}</span>
            </div>
          </div>
          <p className="reviews__text">{comment}</p>
          <time className="reviews__time" dateTime={date}>
            {new Date(date).toLocaleDateString()}
          </time>
        </div>
      </li>
    </ul>
  );
}

export default ReviewsOffer;
