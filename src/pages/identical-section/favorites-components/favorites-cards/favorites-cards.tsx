import FavoritesPlaces from '../favorites-places/favorites-place';
import FavoritesTown from '../favorites-town/favorites-town';
import {Offers} from '../../../../types/types.ts';

interface FavoritesCardsProps {
  offers: Offers[];
}

function FavoritesCards ({offers}: FavoritesCardsProps): JSX.Element {

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        <li className="favorites__locations-items">
          <FavoritesTown />
          <FavoritesPlaces offers={offers}/>
        </li>
      </ul>
    </section>
  );
}

export default FavoritesCards;
