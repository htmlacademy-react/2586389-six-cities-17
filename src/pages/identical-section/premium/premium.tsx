import {Offers} from '../../../types/types.ts';

interface PremiumProps {
  offers: Offers[];
}

function Premium ({offers}: PremiumProps): JSX.Element {
  const hasPremiumOffers = offers.some((offer) => offer.isPremium);

  return (
    <div>
      {hasPremiumOffers && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
    </div>
  );
}

export default Premium;
