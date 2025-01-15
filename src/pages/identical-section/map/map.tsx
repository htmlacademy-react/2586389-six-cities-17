import 'leaflet/dist/leaflet.css';
import UseMap from '../../../components/hooks/use-map.tsx';
import {useRef, useEffect} from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import {MarkerInfo} from '../../../variables/variables.tsx';
import {Offers, City} from '../../../types/types.ts';

interface MapProps {
  city: City;
  offers: Offers[];
  selectedOffers: Offers | null;
  mapClassName?: string;
}

const defaultMapIcon = new Icon({
  iconUrl: MarkerInfo.UrlDef,
  iconSize: [MarkerInfo.Width, MarkerInfo.Height],
  iconAnchor: [MarkerInfo.Left, MarkerInfo.Top]
});

const currentMapIcon = new Icon({
  iconUrl: MarkerInfo.UrlAct,
  iconSize: [MarkerInfo.Width, MarkerInfo.Height],
  iconAnchor: [MarkerInfo.Left, MarkerInfo.Top]
});

function Map({city, offers, selectedOffers, mapClassName = ''}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = UseMap(mapRef, city);

  useEffect(() => {
    if (map && city && offers.length > 0) {
      const markersLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        if (offer.location) {
          const markerMap = new Marker([
            offer.location.latitude,
            offer.location.longitude,
          ]);

          markerMap.setIcon(
            selectedOffers && offer.id === selectedOffers.id
              ? currentMapIcon
              : defaultMapIcon
          );

          markerMap.addTo(markersLayer);
        }
      });

      return () => {
        markersLayer.clearLayers();
      };
    }
  }, [map, city, offers, selectedOffers]);

  if (!city || !offers || offers.length === 0) {
    return <div>Map data is not available</div>;
  }

  return (
    <section className={`${mapClassName} map`} ref={mapRef}>
    </section>
  );
}

export default Map;
