import CardOffer from '../card-offer/card-offer.tsx';
import {useState} from 'react';
import {Offers} from '../../../../types/types.ts';


interface CardOfferListProps {
  offers: Offers[];
  cardType: 'favorites' | 'near-places' | 'cities';
  listClassName?: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
  onCardHover?: (offerId: string | null) => void;
}

function CardOfferList(
  {offers,
    cardType,
    cardClassName,
    listClassName,
    imageWrapperClassName,
    onCardHover
  }: CardOfferListProps):JSX.Element {
  const [activeOfferCardId, setActiveOfferCardId] = useState('');

  // eslint-disable-next-line no-console
  console.log(activeOfferCardId);

  const offerCardMouseEnterHandler = (id: string): void => {
    setActiveOfferCardId(id);
    if (onCardHover) {
      onCardHover(id);
    }
  };
  const offerCardMouseLeaveHandler = (): void => {
    setActiveOfferCardId('');
    if (onCardHover) {
      onCardHover(null);
    }
  };
  return (
    <div className={`places-list ${listClassName}`}>
      {offers.map((offer) => (
        <CardOffer
          key={offer.id}
          offers={offer}
          offersPremium={offers}
          cardType={cardType}
          cardClassName={cardClassName}
          imageWrapperClassName={imageWrapperClassName}
          onOfferCardMouseEnter={() => offerCardMouseEnterHandler(offer.id)}
          onOfferCardMouseLeave={offerCardMouseLeaveHandler}
        />
      ))}
    </div>
  );
}

export default CardOfferList;
