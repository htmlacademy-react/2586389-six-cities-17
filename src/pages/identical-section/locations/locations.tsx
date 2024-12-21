import {MouseEvent} from 'react';
import {City} from '../../../types/types.ts';

interface LocationProps {
  cities: City[];
  onListOfferHover: (cityName: string) => void;
  selectedCity: City | null;
}

function Locations ({onListOfferHover, cities, selectedCity}: LocationProps): JSX.Element {
  const handleOfferItemHover = (evt: MouseEvent<HTMLLIElement>) => {
    onListOfferHover(evt.currentTarget.innerText);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, index) => {
            const keyValue = `${index}-${city.name}`;
            const isActive = selectedCity?.name === city.name;

            return (
              <li className="locations__item" key={keyValue} onMouseEnter={handleOfferItemHover}>
                <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}>
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

export default Locations;
