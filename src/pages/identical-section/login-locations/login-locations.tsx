import { Link } from 'react-router-dom';
import {memo} from 'react';

function LoginLocation (): JSX.Element {
  return(
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to="#">
          <span>Amsterdam</span>
        </Link>
      </div>
    </section>
  );
}

export default memo(LoginLocation);
