import 'leaflet/dist/leaflet.css';
import UseMap from '../../../components/hooks/use-map.tsx';
import {useRef, useEffect} from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../../variables/variables.tsx';
import {Offers, City} from '../../../types/types.ts';

interface MapProps {
  city: City;
  offers: Offers[];
  selectedOffers: Offers | null;
}

const defaultMapIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentMapIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({city, offers, selectedOffers}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = UseMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markersLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        // Создаем маркер
        const markerMap = new Marker([
          offer.location.latitude,
          offer.location.longitude
        ]);

        // Устанавливаем иконку в зависимости от условий
        markerMap.setIcon(
          selectedOffers && offer.id === selectedOffers.id
            ? currentMapIcon
            : defaultMapIcon
        );

        // Добавляем маркер в групповую карту и затем на карту
        markerMap.addTo(markersLayer);
      });

      return () => {
        markersLayer.clearLayers(); // Очищаем группу маркеров при изменении данных
      };
    }
  }, [map, offers, selectedOffers]);

  return (
    <div className="cities__right-section">
      <section className="cities__map map" ref={mapRef}>
      </section>
    </div>
  );
}

export default Map;
