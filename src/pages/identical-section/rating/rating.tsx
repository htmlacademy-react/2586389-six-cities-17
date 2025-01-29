import {memo} from 'react';

interface RatingProps {
  rating: number;
}

function Rating({rating}: RatingProps): JSX.Element {
  const ratingWidth = `${Math.round(rating) * 20}%`;

  return(
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={{ width: ratingWidth }} data-testid="rating-stars"/>
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="offer__rating-value rating__value">{rating}</span>
    </div>
  );
}

export default memo(Rating);
