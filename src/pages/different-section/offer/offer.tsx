import {Helmet} from 'react-helmet-async';
import Header from '../../identical-section/header/header';
import OfferWrapper from '../../identical-section/offer-components/offer-wrapper/offer-wrapper';
import CardOfferList from '../../identical-section/card/card-offer-list/card-offer-list.tsx';
import {useAppDispatch, useAppSelector} from '../../../components/hooks';
import {getOfferData, getOfferStatus} from '../../../store/offer-extended-slice/offer-extended-selector.ts';
import {getNearPlaces} from '../../../store/near-places-slice/near-places-selector.ts';
import {NearPlacesOffersAmount} from '../../../variables/variables.tsx';
import {getReviews} from '../../../store/reviews-slice/reviews-selector.ts';
import {Navigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchNearPlacesOffers, fetchOfferReview, getOfferInfoById} from '../../../store/api-actions.ts';
import {AppRoute, DataStatus} from '../../../const.ts';
import Spinner from '../../identical-section/spinner/spinner.tsx';

function Offer (): JSX.Element {
  const offerData = useAppSelector(getOfferData);
  const offerStatus = useAppSelector(getOfferStatus);
  const nearPlaces = useAppSelector(getNearPlaces).slice(0, NearPlacesOffersAmount);
  const reviews = useAppSelector(getReviews);

  const dispatch = useAppDispatch();

  const {id} = useParams<{
    id: string;
  }>();

  useEffect(() => {
    if(id && offerData.id !== id) {
      dispatch(getOfferInfoById(id));
      dispatch(fetchNearPlacesOffers(id));
      dispatch(fetchOfferReview(id));
    }
  }, [id, offerData.id, dispatch]);

  if (offerData.id !== id) {
    if(offerStatus === DataStatus.Error) {
      return <Navigate to={AppRoute.NotFound} />;
    }
    return <Spinner />;
  }

  return(
    <div className="page">
      <Helmet>
        <title>6 sities: offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer" data-testid='offer-element'>
        <OfferWrapper
          offer={offerData || { goods: [] }}
          reviews={reviews} nearPlaces={nearPlaces}
          city={offerData.city}
          selectedOffer={offerData}
        />
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <CardOfferList offers={nearPlaces}
                cardType="near-places"
                listClassName="near-places__list places__list"
                cardClassName="near-places__card"
                imageWrapperClassName="near-places__image-wrapper"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
