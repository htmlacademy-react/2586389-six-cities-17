import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import Locations from '../../identical-section/locations/locations';
import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return(
    <section>
      <Helmet>
        <title>404.NotFound</title>
      </Helmet>
      <Header />
      <Locations />
      <div className="error">
        <h1>404. Not found</h1>
        <p>You are on a non-existent page.</p>
        <Link to="/">Click to return to the main page</Link>
      </div>
    </section>
  );
}

export default NotFound;
