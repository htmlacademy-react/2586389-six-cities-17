import {MouseEvent, memo} from 'react';
import {City} from '../../../types/types.ts';

interface LocationProps {
  cities: City[];
  onListOfferHover: (cityName: string) => void;
  selectedCity: string | null;
}

function Locations ({onListOfferHover, cities, selectedCity}: LocationProps): JSX.Element {
  const handleOfferItemHover = (evt: MouseEvent<HTMLLIElement>) => {
    const cityName = evt.currentTarget.querySelector('span')?.textContent;
    if (cityName) {
      onListOfferHover(cityName);
    }
  };

  return (
    <div className="tabs" data-testid='locations-container'>
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, index) => {
            const keyValue = `${index}-${city.name}`;
            const isActive = selectedCity === city.name;

            return (
              <li className="locations__item" key={keyValue} onMouseEnter={handleOfferItemHover}>
                <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} data-test-id='locations-item'>
                  <span>{city.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default memo(Locations);
