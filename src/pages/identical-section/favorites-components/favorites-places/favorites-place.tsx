import Premium from '../../premium/premium';
import {Offers} from '../../../../types/types.ts';
import CardOfferList from '../../card/card-offer-list/card-offer-list.tsx';

interface FavoritesPlacesProps {
  offers: Offers[];
}

function FavoritesPlaces({offers}: FavoritesPlacesProps): JSX.Element {
  return(
    <div className="favorites__places">
      <article className="favorites__card place-card">
        <Premium offers={offers}/>
        <CardOfferList offers={offers} cardType={'favorites'}/>
      </article>
    </div>
  );
}

export default FavoritesPlaces;
