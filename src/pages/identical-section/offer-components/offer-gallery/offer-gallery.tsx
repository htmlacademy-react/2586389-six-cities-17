import {OfferExtended} from '../../../../types/types.ts';

interface OfferGalleryProps {
  offerExtended: OfferExtended;
}

function OfferGallery({offerExtended}: OfferGalleryProps): JSX.Element {
  const {images, id} = offerExtended;

  return(
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image) => (
          <div className="offer__image-wrapper" key={id}>
            <img
              className="offer__image"
              src={image}
              alt="Photo studio"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
