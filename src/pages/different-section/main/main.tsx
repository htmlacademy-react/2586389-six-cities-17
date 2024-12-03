import { Helmet } from 'react-helmet-async';
import CardOffer from '../../identical-section/card-offer/card-offer';
import Header from '../../identical-section/header/header';
import Locations from '../../identical-section/locations/locations';
import CitiesMap from '../../identical-section/cities-map/cities-map';
import CitiesPlaces from '../../identical-section/cities-places/cities-places';

type MainProps = {
  numberRentals: number;
}

function Main({numberRentals}: MainProps): JSX.Element {
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
              <CitiesPlaces />
              <div className="cities__places-list places__list tabs__content">
                {Array.from({ length: numberRentals }, (_, index) => (
                  <CardOffer key={index} />
                ))}
              </div>
            </section>
            <CitiesMap />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
