import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import Locations from '../../identical-section/locations/locations';
import CitiesMap from '../../identical-section/cities-map/cities-map';
import CitiesPlaces from '../../identical-section/cities-places/cities-places';
import { Offers } from '../../../types/types';
import CardOfferList from '../../identical-section/card/card-offer-list/card-offer-list.tsx';

export interface MainProps {
  offers: Offers[];
}

function Main({ offers }: MainProps,): JSX.Element {

  return(
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <CitiesPlaces offers={offers} />
              <CardOfferList offers={offers} />
            </section>
            <CitiesMap />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
