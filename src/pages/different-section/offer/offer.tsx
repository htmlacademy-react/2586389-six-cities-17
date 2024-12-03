import { Helmet } from 'react-helmet-async';
import CardOffer from '../../identical-section/card-offer/card-offer';
import Header from '../../identical-section/header/header';
import OfferGallery from '../../identical-section/offer-components/offer-gallery/offer-gallery';
import OfferWrapper from '../../identical-section/offer-components/offer-wrapper/offer-wrapper';

function Offer (): JSX.Element {
  return(
    <div className="page">
      <Helmet>
        <title>6 sities: offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery />
          <OfferWrapper />
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <CardOffer />
              <CardOffer />
              <CardOffer />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
