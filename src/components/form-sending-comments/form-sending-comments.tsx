import {ChangeEvent, useState} from 'react';
import FormSendingRatings from './form-sending-rating/form-sending-rating.tsx';
import {MaxLengthOfReview, MinLengthOfReview, RatingsStars} from '../../variables/variables.tsx';
import {useAppDispatch, useAppSelector} from '../hooks';
import {getPostingStatus} from '../../store/reviews-slice/reviews-selector.ts';
import {getOfferData} from '../../store/offer-extended-slice/offer-extended-selector.ts';
import {postReviewToOffer} from '../../store/api-actions.ts';
import {AppRoute, AuthorizationStatus, PostingStatus} from '../../const.ts';
import {getAuthStatus} from '../../store/auth-slice/auth-selector.ts';
import {Link} from 'react-router-dom';

const reviewInitialState = {
  comment: '',
  rating: 0,
};

function FormSendingComments():JSX.Element {
  const dispatch = useAppDispatch();
  const postingStatus = useAppSelector(getPostingStatus);
  const offerId = useAppSelector(getOfferData)?.id;
  const authorizationStatus = useAppSelector(getAuthStatus);

  const [reviewFormState,setReviewFormState] = useState(reviewInitialState);
  const { comment, rating } = reviewFormState;

  const handleRatingChange = (value: number): void => {
    setReviewFormState((prevState) => ({
      ...prevState,
      rating: value,
    }));
  };

  const handleFormSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(offerId) {
      dispatch(postReviewToOffer({ comment, rating, offerId }));
      setReviewFormState(reviewInitialState);
    }
  };

  const submitCondition = Boolean(rating) && (
    comment.length >= MinLengthOfReview && comment.length < MaxLengthOfReview
  );

  const statusForm =
    authorizationStatus !== AuthorizationStatus.Auth ? (
      <Link to={AppRoute.Login}>
        <button
          style={{
            backgroundColor: '#4481C3',
            color: '#FFFFFF',
            margin: '15px',
            borderColor: '#4481C3',
            borderRadius: '15px',
            cursor: 'pointer'
          }}
        > <p
            style={{
              margin: '5px',
            }}
          >
          To leave comments, you need to register
          </p>
        </button>
      </Link>
    ) : (
      <>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={reviewFormState.comment}
          onChange={(e) => {
            setReviewFormState((prevState) => ({
              ...prevState,
              comment: e.target.value,
            }));
          }}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe
            your stay with at least{' '}
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!submitCondition || postingStatus === PostingStatus.Posting}
          >
            {postingStatus === PostingStatus.Posting ? 'Posting...' : 'Submit'}
          </button>
        </div>
      </>
    );

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RatingsStars.map(({value, title}) => (
          <FormSendingRatings
            key={value}
            value={value}
            title={title}
            onRatingButtonChange={handleRatingChange}
            checked={reviewFormState.rating === value}
          />
        )
        )}
      </div>
      {statusForm}
    </form>
  );
}

export default FormSendingComments;
