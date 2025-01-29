import { Helmet } from 'react-helmet-async';
import Footer from '../../identical-section/footer/footer';
import Header from '../../identical-section/header/header';
import {useAppDispatch, useAppSelector} from '../../../components/hooks';
import {getFavoriteOffers} from '../../../store/favorite-slice/favorite-selector.ts';
import {Offers} from '../../../types/types.ts';
import {changeCity} from '../../../store/offers-slice/offers-slice.ts';
import {Link} from 'react-router-dom';
import CardOfferList from '../../identical-section/card-offer-list/card-offer-list.tsx';
import FavoritesEmpty from '../favorites-empty/favorites-empty.tsx';

function Favorites (): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const dispatch = useAppDispatch();
  const isFavoritesEmpty = favoriteOffers.length === 0;

  const offersByCity = favoriteOffers.reduce<Record<string, Offers[]>>((acc, offer) => {
    const city = offer.city.name;
    if(!acc[city]){
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});

  const handleCityClick = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <div className="page" data-testid='favorites'>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main className='page__main page__main--favorites' data-testid='favorites-element'>
        <div className='page__favorites-container container'>
          {isFavoritesEmpty ?
            (<FavoritesEmpty />) : (
              <section className='favorites'>
                <h1 className='favorites__title'>Saved listing</h1>
                <ul className='favorites__list' data-testid='favorites-list'>
                  {Object.entries(offersByCity).map(([city, cityOffers]) => (
                    <li key={city} className='favorites__locations-items'>
                      <div className='favorites__locations locations locations--current'>
                        <div className='locations__item'>
                          <Link
                            className='locations__item-link'
                            to='/'
                            onClick={() => {
                              handleCityClick(city);
                            }}
                          >
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <div className='favorites__places'>
                        <CardOfferList
                          key={city}
                          cardType={'favorites'}
                          offers={cityOffers}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Favorites;
