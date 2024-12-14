import { Helmet } from 'react-helmet-async';
import FavoritesCards from '../../identical-section/favorites-components/favorites-cards/favorites-cards';
import Footer from '../../identical-section/footer/footer';
import Header from '../../identical-section/header/header';
import {Offers} from '../../../types/types.ts';

interface FavoritesProps {
  offers: Offers[];
}

function Favorites ({offers}: FavoritesProps): JSX.Element {
  return(
    <div className="page">
      <Helmet>
        <title>6 sities: favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesCards offers={offers} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Favorites;
