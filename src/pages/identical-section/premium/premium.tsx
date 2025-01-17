interface PremiumProps {
  isPremium: boolean;
}

function Premium ({isPremium}: PremiumProps): JSX.Element {

  return (
    <div>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
    </div>
  );
}

export default Premium;
