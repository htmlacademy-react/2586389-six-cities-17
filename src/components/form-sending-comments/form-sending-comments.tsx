import {useState, ChangeEvent} from 'react';
import{FormSendingCommentsProps, Ratings} from '../../types/types.ts';
import FormSendingRatings from './form-sending-rating/form-sending-rating.tsx';
import {MIN_LENGTH_OF_REVIEW, MAX_LENGTH_OF_REVIEW} from '../../variables/variables.tsx';

const initialValues: FormSendingCommentsProps = {
  rating: 0,
  review: ''
};

const ratings: Ratings = [
  [1, 'terribly'],
  [2, 'badly'],
  [3, 'not bad'],
  [4, 'good'],
  [5, 'perfect'],
];

function FormSendingComments():JSX.Element {

  const [formData, setFormData] = useState(initialValues);
  const [isButtonOffer, setIsButtonOffer] = useState(true);

  const handleValueChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const {name, value} = evt.target;

    const formDataLength = formData.review.length > MIN_LENGTH_OF_REVIEW && formData.review.length < MAX_LENGTH_OF_REVIEW;

    if (evt.target instanceof HTMLInputElement || evt.target instanceof HTMLTextAreaElement) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if(formDataLength) {
      setIsButtonOffer(false);
    }
  };

  const handleSubmitForm = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormData(initialValues);
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmitForm}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(([value, title]) => (
          <FormSendingRatings key={value} value={value} title={title} handleValueChange={handleValueChange} />
        )
        )}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleValueChange}
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
          disabled={isButtonOffer}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormSendingComments;
