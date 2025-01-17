import Bookmark from '../../bookmark/bookmark';
import Premium from '../../premium/premium';
import Rating from '../../rating/rating';
import OfferHost from '../offer-host/offer-host';
import {Reviews, City, OfferExtended, Offers} from '../../../../types/types.ts';
import FormSendingComments from '../../../../components/form-sending-comments/form-sending-comments.tsx';
import ReviewsOfferList from '../../reviews/reviews-offer-list.tsx';
import Map from '../../map/map.tsx';

interface OfferWraperProps {
  reviews: Reviews[];
  offer: OfferExtended;
  nearPlaces: Offers[];
  city: City;
  selectedOffer: OfferExtended | null;
}

function OfferWrapper ({offer, reviews, nearPlaces, city, selectedOffer}: OfferWraperProps): JSX.Element {
  const { id, title, type, price, rating, isPremium, bedrooms, maxAdults, goods } = offer;

  return(
    <div className="offer__container container">
      <div className="offer__wrapper">
        <Premium isPremium={isPremium}/>
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {title}
          </h1>
          <Bookmark isFavorite={offer.isFavorite}/>
        </div>
        <Rating rating={rating}/>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">{type}</li>
          <li className="offer__feature offer__feature--bedrooms">
            {bedrooms} Bedroom{bedrooms > 1 ? 's' : ''}
          </li>
          <li className="offer__feature offer__feature--adults">
          Max {maxAdults} adult{maxAdults > 1 ? 's' : ''}
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">€{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What`&apos`s inside</h2>
          <ul className="offer__inside-list">
            {goods?.map((good) => ( // Используйте опциональную цепочку
              <li key={id} className="offer__inside-item">{good}</li>
            ))}
          </ul>
        </div>
        <OfferHost offerExtended={offer || { host: { avatarUrl: '', name: '', isPro: false }, description: '' }} />
        <ReviewsOfferList reviews={reviews}/>
        <FormSendingComments />
        {/* Посмотрите, пожалуйста, почему карта не растягивается на всю ширину экрана, как должна? Я проверяла классы,
        они правильные, вроде, но может где-то пропустила что-то */}
        <Map mapClassName="offer__map" city={city} offers={nearPlaces} selectedOffers={selectedOffer} />
      </div>
    </div>
  );
}

export default OfferWrapper;
