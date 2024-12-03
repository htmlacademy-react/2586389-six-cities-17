import { Link } from 'react-router-dom';

function FavoritesTown (): JSX.Element {
  return(
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to="#">
          <span>Amsterdam</span>
        </Link>
      </div>
    </div>
  );
}

export default FavoritesTown;
