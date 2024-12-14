import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import Locations from '../../identical-section/locations/locations';
import { Link } from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

function NotFound(): JSX.Element {
  return(
    <section>
      <Helmet>
        <title>404.NotFound</title>
      </Helmet>
      <Header />
      <Locations />
      <div className="error"
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center'
        }}
      >
        <h1>404. Not found</h1>
        <p>You are on a non-existent page.</p>
        <Link to={AppRoute.Main} style={{ color: '#4481C3' }}>Click to return to the main page</Link>
      </div>
    </section>
  );
}

export default NotFound;
