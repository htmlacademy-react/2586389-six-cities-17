import {describe} from 'vitest';
import {makeFakeImages} from '../../../utils/mocks/mocks.ts';
import OfferGallery from './offer-gallery.tsx';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Component: OfferGallery', () => {
  it('should render correctly', () => {
    const galleryContainerTestId = 'gallery-container';
    const offerImageWrapperTestId = 'offer-image-wrapper';

    const images = makeFakeImages();

    render(<OfferGallery images={images} />);

    const offerGaleryContainer = screen.getByTestId(galleryContainerTestId);
    const offerImages = screen.getAllByTestId(offerImageWrapperTestId);

    expect(offerGaleryContainer).toBeInTheDocument();
    expect(offerImages.length).toBe(images.length);
  });
});
