import Bookmark from '../bookmark/bookmark.tsx';
import Premium from '../premium/premium.tsx';
import Rating from '../rating/rating.tsx';
import OfferHost from '../offer-host/offer-host.tsx';
import {City, OfferExtended, Offers, Reviews} from '../../../types/types.ts';
import FormSendingComments from '../../../components/form-sending-comments/form-sending-comments.tsx';
import ReviewsOfferList from '../reviews-offer-list/reviews-offer-list.tsx';
import Map from '../map/map.tsx';
import {BookmarkStatus} from '../../../const.ts';
import OfferGallery from '../offer-gallery/offer-gallery.tsx';

interface OfferWraperProps {
  reviews: Reviews[];
  offer: OfferExtended;
  nearPlaces: Offers[];
  city: City;
  selectedOffer: OfferExtended | null;
}

function OfferWrapper ({offer, reviews, nearPlaces, city, selectedOffer}: OfferWraperProps): JSX.Element {
  const { title, type, price, rating, isPremium, bedrooms, maxAdults, goods, isFavorite, id, images } = offer;

  return (
    <section className="offer" data-testid='offer-wrapper'>
      <OfferGallery images={images || []}/>
      <div className="offer__container container">
        <div className="offer__wrapper">
          <Premium isPremium={isPremium}/>
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {title}
            </h1>
            <Bookmark isFavorite={isFavorite} offerId={id} bookmarkButton={BookmarkStatus.Offer}/>
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
              {goods?.map((good) => (
                <li key={good} className="offer__inside-item">{good}</li>
              ))}
            </ul>
          </div>
          <OfferHost offerExtended={offer || { host: { avatarUrl: '', name: '', isPro: false }, description: '' }} />
          <ReviewsOfferList reviews={reviews}/>
          <FormSendingComments />
        </div>
      </div>
      <Map mapClassName="offer__map" city={city} offers={nearPlaces} selectedOffers={selectedOffer} />
    </section>
  );
}

export default OfferWrapper;
