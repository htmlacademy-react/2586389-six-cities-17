import PlaceOptions from '../place-options/place-options';

function CitiesPlaces(): JSX.Element {
  return(
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
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
