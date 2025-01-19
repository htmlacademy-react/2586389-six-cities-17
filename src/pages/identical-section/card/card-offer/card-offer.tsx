import { Link } from 'react-router-dom';
import Bookmark from '../../bookmark/bookmark.tsx';
import { Offers } from '../../../../types/types.ts';
import {AppRoute} from '../../../../const.ts';
import { generatePath } from 'react-router-dom';
import Premium from '../../premium/premium.tsx';
import {BookmarkStatus} from '../../../../const.ts';

interface CardOfferProps {
  offers: Offers;
  cardType: 'favorites' | 'near-places' | 'cities';
  onOfferCardMouseEnter?: () => void;
  onOfferCardMouseLeave?: () => void;
  cardClassName?: string;
  imageWrapperClassName?: string;
}

function CardOffer(
  {offers,
    cardType,
    onOfferCardMouseEnter,
    onOfferCardMouseLeave,
    cardClassName = '',
    imageWrapperClassName = ''}
  : CardOfferProps): JSX.Element {
  const { id, previewImage, price, isFavorite, rating, title, type, isPremium } = offers;

  const imageW = cardType === 'favorites' ? '150' : '260';
  const imageH = cardType === 'favorites' ? '110' : '200';

  return(
    <article
      className={`${cardType}__card place-card ${cardClassName}`}
      onMouseEnter={onOfferCardMouseEnter}
      onMouseLeave={onOfferCardMouseLeave}
    >
      <Premium isPremium={isPremium}/>
      <div className={`${cardType}__image-wrapper place-card__image-wrapper ${imageWrapperClassName}`}>
        <Link to={generatePath(AppRoute.Offer, {id})}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageW}
            height={imageH}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark isFavorite={isFavorite} offerId={id} bookmarkButton={BookmarkStatus.PlacesCard}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}/>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id})}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default CardOffer;
