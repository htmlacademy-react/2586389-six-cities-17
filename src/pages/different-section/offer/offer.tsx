import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import OfferGallery from '../../identical-section/offer-components/offer-gallery/offer-gallery';
import OfferWrapper from '../../identical-section/offer-components/offer-wrapper/offer-wrapper';
import {OfferExtended, Offers, Reviews} from '../../../types/types.ts';
import CardOfferList from '../../identical-section/card/card-offer-list/card-offer-list.tsx';

interface OfferProps {
  offers: Offers[];
  reviews: Reviews[];
  offerExtended: OfferExtended;
}

function Offer ({offers, reviews, offerExtended}: OfferProps): JSX.Element {
  const currentOffer = offers[0];
  const nearbyOffers: Offers[] = offers.slice(0, 3);

  return(
    <div className="page">
      <Helmet>
        <title>6 sities: offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery offerExtended={offerExtended}/>
          <OfferWrapper offers={nearbyOffers} reviews={reviews} city={currentOffer.city} selectedOffer={currentOffer} offerExtended={offerExtended}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <CardOfferList offers={nearbyOffers}
                cardType="near-places"
                listClassName="near-places__list places__list"
                cardClassName="near-places__card"
                imageWrapperClassName="near-places__image-wrapper"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
