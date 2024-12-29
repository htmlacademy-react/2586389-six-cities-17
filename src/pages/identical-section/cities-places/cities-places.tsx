import { Offers} from '../../../types/types';
import SortingPlaces from '../sorting/sorting-places-options.tsx';

interface OffersProps {
  offers: Offers[];
  selectedCity: string | null;
}

function CitiesPlaces({offers, selectedCity}: OffersProps): JSX.Element {
  return(
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
      <SortingPlaces />
    </>
  );
}

export default CitiesPlaces;
