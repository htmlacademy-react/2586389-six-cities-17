import { Link } from 'react-router-dom';
import {memo} from 'react';

function Footer(): JSX.Element {
  return(
    <footer className="footer container">
      <Link className="footer__logo-link" to="main.html">
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
        />
      </Link>
    </footer>
  );
}

export default memo(Footer);
