import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import Locations from '../../identical-section/locations/locations';
import {City, Offers} from '../../../types/types';
import CardOfferList from '../../identical-section/card/card-offer-list/card-offer-list.tsx';
import Map from '../../identical-section/map/map';
import { useAppSelector, useAppDispatch} from '../../../components/hooks';
import {changeCity} from '../../../store/actions.ts';
import SortingPlaces from '../../identical-section/sorting/sorting-places.tsx';
import {sortOffers} from '../../../const.ts';
import {useState} from 'react';
import Spinner from '../../identical-section/spinner/spinner.tsx';
//import ErrorMessage from '../../identical-section/error-message/error-message.tsx';

export interface MainProps {
  city: City[];
}

function Main({ city }: MainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offerCard = useAppSelector((state) => state.offers.offers);
  const selectedCity = useAppSelector((state) => state.city.currentCity);
  const currentSort = useAppSelector((state) => state.sort.currentSort);
  const isLoading = useAppSelector((state) => state.offers.isLoading);
  //const error = useAppSelector((state) => state.offers.error);

  const [selectedOffer, setSelectedOffer] = useState<Offers | null>(null); // Состояние для выбранной карточки

  const filteredOffers = selectedCity
    ? offerCard.filter((offer) => offer.city.name === selectedCity)
    : offerCard;

  const sortedOfferCards = sortOffers(filteredOffers, currentSort);

  const handleOfferItemHover = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  const handleCardHover = (offerId: string | null) => {
    if (offerId) {
      const selected = filteredOffers.find((offer) => offer.id === offerId) || null;
      setSelectedOffer(selected);
    } else {
      setSelectedOffer(null);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {selectedCity}</b>
              <SortingPlaces/>
              <CardOfferList
                offers={sortedOfferCards} // Передаём весь массив предложений
                cardType="cities"
                onCardHover={handleCardHover}
                listClassName="tabs__content"
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city.find((c) => c.name === selectedCity) || city[0]}
                offers={filteredOffers}
                selectedOffers={selectedOffer}
                mapClassName="cities__map"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
