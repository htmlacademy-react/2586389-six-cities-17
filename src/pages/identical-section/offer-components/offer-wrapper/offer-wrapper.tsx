import Bookmark from '../../bookmark/bookmark';
import Premium from '../../premium/premium';
import Rating from '../../rating/rating';
import OfferHost from '../offer-host/offer-host';
import OfferReviews from '../offer-reviews/offer-reviews';

function OfferWrapper (): JSX.Element {
  return(
    <div className="offer__container container">
      <div className="offer__wrapper">
        <Premium />
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
          Beautiful &amp; luxurious studio at great location
          </h1>
          <Bookmark />
        </div>
        <Rating />
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">Apartment</li>
          <li className="offer__feature offer__feature--bedrooms">
          3 Bedrooms
          </li>
          <li className="offer__feature offer__feature--adults">
          Max 4 adults
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">€120</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What`&apos`s inside</h2>
          <ul className="offer__inside-list">
            <li className="offer__inside-item">Wi-Fi</li>
            <li className="offer__inside-item">Washing machine</li>
            <li className="offer__inside-item">Towels</li>
            <li className="offer__inside-item">Heating</li>
            <li className="offer__inside-item">Coffee machine</li>
            <li className="offer__inside-item">Baby seat</li>
            <li className="offer__inside-item">Kitchen</li>
            <li className="offer__inside-item">Dishwasher</li>
            <li className="offer__inside-item">Cabel TV</li>
            <li className="offer__inside-item">Fridge</li>
          </ul>
        </div>
        <OfferHost />
        <OfferReviews />
      </div>
    </div>
  );
}

export default OfferWrapper;
