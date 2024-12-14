import {useState, ChangeEvent} from 'react';

interface FormSendingCommentsProps {
  rating: number;
  review: string;
}

function FormSendingComments():JSX.Element {
  const initialValues: FormSendingCommentsProps = {
    rating: 0,
    review: ''
  };

  const [formData, setFormData] = useState(initialValues);
  const [isButtonOffer, setIsButtonOffer] = useState<boolean>(true);

  const handleValueChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputName: keyof FormSendingCommentsProps
  ) => {
    const value = evt.target.value;

    if (evt.target instanceof HTMLInputElement || evt.target instanceof HTMLTextAreaElement) {
      setFormData((prevState) => ({
        ...prevState,
        [inputName]: value,
      }));
    }

    if(formData.review.length > 50 && formData.review.length < 300) {
      setIsButtonOffer(false);
    }
  };

  const handleSubmitForm = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormData(initialValues);
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitForm}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          onChange={(evt) => handleValueChange(evt, 'rating')}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          onChange={(evt) => handleValueChange(evt, 'rating')}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          onChange={(evt) => handleValueChange(evt, 'rating')}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          onChange={(evt) => handleValueChange(evt, 'rating')}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          onChange={(evt) => handleValueChange(evt, 'rating')}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={(evt) => handleValueChange(evt, 'review')}
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
