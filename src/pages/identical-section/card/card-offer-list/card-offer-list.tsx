import CardOffer from '../card-offer/card-offer.tsx';
import {useState} from 'react';
import {Offers} from '../../../../types/types.ts';


interface CardOfferListProps {
  offers: Offers[];
}

function CardOfferList({offers}: CardOfferListProps):JSX.Element {
  const [activeOfferCardId, setActiveOfferCardId] = useState<string | null>(null);

  // eslint-disable-next-line no-console
  console.log(activeOfferCardId);

  const offerCardMouseEnterHandler = (id: string): void => {
    setActiveOfferCardId(id);
  };
  const offerCardMouseLeaveHandler = (): void => {
    setActiveOfferCardId(null);
  };
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CardOffer key={offer.id} offers={offer} offersPremium={offers}
          cardType='cities'
          onOfferCardMouseEnter={() => {
            offerCardMouseEnterHandler(offer.id);
          }}
          onOfferCardMouseLeave={() => {
            offerCardMouseLeaveHandler();
          }}
        />
      ))}
    </div>
  );
}

export default CardOfferList;
