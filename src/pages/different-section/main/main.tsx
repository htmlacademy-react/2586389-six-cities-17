import { Helmet } from 'react-helmet-async';
import Locations from '../../identical-section/locations/locations';
import {Offers} from '../../../types/types';
import {Cities} from '../../../variables/variables.tsx';
import CardOfferList from '../../identical-section/card/card-offer-list/card-offer-list.tsx';
import Map from '../../identical-section/map/map';
import { useAppSelector, useAppDispatch} from '../../../components/hooks';
import {changeCity} from '../../../store/offers-slice/offers-slice.ts';
import SortingPlaces from '../../identical-section/sorting/sorting-places.tsx';
import {sortOffers} from '../../../utils/utlis.ts';
import {useState} from 'react';
import {getAllOffers, getSortedOffers} from '../../../store/offers-slice/offers-selector.ts';
import {getSortingType} from '../../../store/offers-slice/offers-selector.ts';
import {getSelectedCity} from '../../../store/offers-slice/offers-selector.ts';
import Header from '../../identical-section/header/header.tsx';
import MainEmpty from '../main-empty/main-empty.tsx';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const offerCard = useAppSelector(getAllOffers);
  const selectedCity = useAppSelector(getSelectedCity);
  const currentSort = useAppSelector(getSortingType);
  const sortedOffers = useAppSelector(getSortedOffers);

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


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 sities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Locations cities={Cities} onListOfferHover={handleOfferItemHover} selectedCity={selectedCity}/>

        {sortedOffers.length !== 0 ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} places to stay in {selectedCity}
                </b>
                <SortingPlaces />
                <CardOfferList
                  offers={sortedOfferCards}
                  cardType="cities"
                  onCardHover={handleCardHover}
                  listClassName="tabs__content"
                />
              </section>
              <div className="cities__right-section">
                <Map
                  city={Cities.find((c) => c.name === selectedCity) || Cities[0]}
                  offers={filteredOffers}
                  selectedOffers={selectedOffer}
                  mapClassName="cities__map"
                />
              </div>
            </div>
          </div>
        ) : (
          <MainEmpty />
        )}

      </main>
    </div>
  );
}

export default Main;
