import {ChangeEvent} from 'react';

interface FormSendingRatingsProps {
  value: number;
  title: string;
  handleValueChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function FormSendingRatings ({value, title, handleValueChange}: FormSendingRatingsProps):JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        onChange={handleValueChange}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </>
  );
}

export default FormSendingRatings;
