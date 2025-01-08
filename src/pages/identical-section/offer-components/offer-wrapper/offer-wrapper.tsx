import Bookmark from '../../bookmark/bookmark';
import Premium from '../../premium/premium';
import Rating from '../../rating/rating';
import OfferHost from '../offer-host/offer-host';
import {Offers, Reviews, City, OfferExtended} from '../../../../types/types.ts';
import FormSendingComments from '../../../../components/form-sending-comments/form-sending-comments.tsx';
import ReviewsOfferList from '../../reviews/reviews-offer-list.tsx';
import Map from '../../map/map.tsx';

interface OfferWraperProps {
  offers: Offers[];
  reviews: Reviews[];
  city: City;
  selectedOffer: Offers | null;
  offerExtended: OfferExtended;
}

function OfferWrapper ({offers, reviews, city, selectedOffer, offerExtended}: OfferWraperProps): JSX.Element {
  const { title, type, price, bedrooms, maxAdults, goods, id} = offerExtended;

  return(
    <div className="offer__container container">
      <div className="offer__wrapper">
        <Premium offers={offers}/>
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {title}
          </h1>
          <Bookmark />
        </div>
        <Rating />
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">{type}</li>
          <li className="offer__feature offer__feature--bedrooms">
            {bedrooms} Bedrooms
          </li>
          <li className="offer__feature offer__feature--adults">
          Max {maxAdults} adults
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">€{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What`&apos`s inside</h2>
          <ul className="offer__inside-list">
            {goods.map((good) => (
              <li key={id} className="offer__inside-item">{good}</li>
            ))}
          </ul>
        </div>
        <OfferHost offerExtended={offerExtended}/>
        <ReviewsOfferList reviews={reviews} />
        <FormSendingComments />
        <Map mapClassName="offer__map" city={city} offers={offers} selectedOffers={selectedOffer} />
      </div>
    </div>
  );
}

export default OfferWrapper;
