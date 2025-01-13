import ReviewsOffer from './reviews-offer.tsx';
import {Reviews} from '../../../types/types.ts';

interface ReviewsOfferLisrProps {
  reviews: Reviews[];
}

function ReviewsOfferList({reviews}: ReviewsOfferLisrProps): JSX.Element {
  const totalReviews: number = reviews.length;
  return (
    <section className="offer__reviews reviews">
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

export default ReviewsOfferList;