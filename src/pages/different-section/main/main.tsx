import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import Locations from '../../identical-section/locations/locations';
import CitiesPlaces from '../../identical-section/cities-places/cities-places';
import { Offers, City } from '../../../types/types';
import CardOfferList from '../../identical-section/card/card-offer-list/card-offer-list.tsx';
import Map from '../../identical-section/map/map';
import {useState} from 'react';

export interface MainProps {
  offers: Offers[];
  city: City[];
}

function Main({ offers, city }: MainProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState<City | null>(() => city.find((c) => c.name === 'Amsterdam') || city[0]);

  const handleOfferItemHover = (cityName: string) => {
    const currentCity = city.find((c) => c.name === cityName) || null;
    setSelectedCity(currentCity);
  };

  const filteredOffers = selectedCity
    ? offers.filter((offer) => offer.city.name === selectedCity.name)
    : offers;

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations cities={city} onListOfferHover={handleOfferItemHover} selectedCity={selectedCity}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <CitiesPlaces offers={offers} />
              <CardOfferList offers={offers} />
            </section>
            <Map city={selectedCity || city[0]} offers={filteredOffers} selectedOffers={null} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
