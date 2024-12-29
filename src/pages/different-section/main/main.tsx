import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import Locations from '../../identical-section/locations/locations';
import CitiesPlaces from '../../identical-section/cities-places/cities-places';
import { City } from '../../../types/types';
import CardOfferList from '../../identical-section/card/card-offer-list/card-offer-list.tsx';
import Map from '../../identical-section/map/map';
import { useAppSelector, useAppDispatch} from '../../../components/hooks';
import {changeCity} from '../../../store/actions.ts';

export interface MainProps {
  city: City[];
}

function Main({ city }: MainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offerCard = useAppSelector((state) => state.offerCard);
  const selectedCity = useAppSelector((state) => state.currentCity);

  const handleOfferItemHover = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  const filteredOffers = selectedCity
    ? offerCard.filter((offer) => offer.city.name === selectedCity)
    : offerCard;

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
              <CitiesPlaces offers={filteredOffers} selectedCity={selectedCity}/>
              <CardOfferList offers={filteredOffers} />
            </section>
            <Map city={city.find((c) => c.name === selectedCity) || city[0]} offers={filteredOffers} selectedOffers={null} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
