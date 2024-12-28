import { Offers} from '../../../types/types';
import PlaceOptions from '../place-options/place-options';

interface OffersProps {
  offers: Offers[];
  selectedCity: string | null;
}

function CitiesPlaces({offers, selectedCity}: OffersProps): JSX.Element {
  return(
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
              Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        < PlaceOptions />
      </form>
    </>
  );
}

export default CitiesPlaces;
