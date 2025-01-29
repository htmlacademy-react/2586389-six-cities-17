import ReviewsOffer from '../reviews-offer/reviews-offer.tsx';
import {Reviews} from '../../../types/types.ts';
import {memo} from 'react';

interface ReviewsOfferLisrProps {
  reviews: Reviews[];
}

function ReviewsOfferList({reviews}: ReviewsOfferLisrProps): JSX.Element {
  const totalReviews: number = reviews.length;
  return (
    <section className="offer__reviews reviews" data-testid='reviews-offer'>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{totalReviews}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewsOffer key={review.id} reviews={review}/>
        ))}
      </ul>
    </section>
  );
}

export default memo(ReviewsOfferList);
