import {useAppSelector} from '../../../components/hooks';
import {getAuthStatus} from '../../../store/auth-slice/auth-selector.ts';
import {AuthorizationStatus} from '../../../const.ts';
import {memo} from 'react';

interface PremiumProps {
  isPremium: boolean;
}

function Premium ({isPremium}: PremiumProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  const premiumStatusAuth =
    authorizationStatus === AuthorizationStatus.Auth && isPremium ? (
      <div className="place-card__mark" data-testid='premium-mark'>
        <span>Premium</span>
      </div>
    ) : null;

  return (
    <div>
      {premiumStatusAuth}
    </div>
  );
}

export default memo(Premium);
