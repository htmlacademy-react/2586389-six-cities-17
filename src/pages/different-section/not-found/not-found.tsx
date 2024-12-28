import { Helmet } from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import { Link } from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

function NotFound(): JSX.Element {
  return(
    <section>
      <Helmet>
        <title>404.NotFound</title>
      </Helmet>
      <Header />
      <div className="error"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh', // Занимает всю высоту экрана
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h1>404. Not found</h1>
          <p>You are on a non-existent page.</p>
          <Link to={AppRoute.Main} style={{color: '#4481C3'}}>Click to return to the main page</Link>
        </div>

      </div>
    </section>
  );
}

export default NotFound;
