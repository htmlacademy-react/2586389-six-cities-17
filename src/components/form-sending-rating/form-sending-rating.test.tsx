import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {faker} from '@faker-js/faker';
import FormSendingRatings from './form-sending-rating.tsx';

describe('Component: FormSendingRatings', () => {
  it('should render correctly', () => {
    const value = faker.number.int({ min: 1, max: 5 });
    const title = faker.string.alpha(10);
    const checked = faker.datatype.boolean();
    const onRatingButtonChange = vi.fn();

    const ratingInputTestId = `rating-input-${value}`;
    const ratingLabelTestId = `rating-label-${value}`;

    render(<FormSendingRatings value={value} title={title} checked={checked} onRatingButtonChange={onRatingButtonChange}/>);

    const ratingInput = screen.getByTestId(ratingInputTestId);
    const ratingLabel = screen.getByTestId(ratingLabelTestId);

    expect(ratingInput).toBeInTheDocument();
    expect(ratingLabel).toBeInTheDocument();
  });
});
