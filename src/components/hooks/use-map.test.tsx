import { renderHook } from '@testing-library/react';
import {createRef, MutableRefObject} from 'react';
import {Map} from 'leaflet';
import useMap from './use-map';
import { describe, it, expect } from 'vitest';
import {makeFakeCity} from '../../utils/mocks/mocks.ts';

describe('useMap hook', () => {
  it('should initialize map on first render', () => {
    const city = makeFakeCity();
    const mapRef = createRef() as MutableRefObject<HTMLDivElement>;
    mapRef.current = document.createElement('div');

    const {result} = renderHook(() => useMap(mapRef, city));
    const map = result.current;

    expect(map).not.toBeNull();
    expect(map).toBeInstanceOf(Map);
  });

  it('Should initialize the map once', () => {
    const city = makeFakeCity();
    const mapRef = createRef() as MutableRefObject<HTMLDivElement>;
    mapRef.current = document.createElement('div');

    const { result, rerender } = renderHook(
      ({ cityLocation }) => useMap(mapRef, cityLocation),
      { initialProps: { cityLocation: city } }
    );

    const map = result.current;
    expect(map).not.toBeNull();
    expect(map).toBeInstanceOf(Map);

    const newCity = makeFakeCity();
    rerender({ cityLocation: newCity });

    const newMap = result.current;
    expect(newMap).toBe(map);
  });

  it('Should update map view when city location changes', () => {
    const city = makeFakeCity();
    const mapRef = createRef() as MutableRefObject<HTMLDivElement>;
    mapRef.current = document.createElement('div');

    const { result, rerender } = renderHook(
      ({ cityLocation }) => useMap(mapRef, cityLocation),
      { initialProps: { cityLocation: city } }
    );

    const map = result.current;
    expect(map).not.toBeNull();

    const updatedCity = {
      ...city,
      location: {
        ...city.location,
        latitude: 50,
        longitude: 50,
      },
    };

    rerender({ cityLocation: updatedCity });

    const center = map ? map.getCenter() : null;

    if (center) {
      expect(center.lat).toBe(updatedCity.location.latitude);
      expect(center.lng).toBe(updatedCity.location.longitude);
    } else {
      fail('');
    }
  });
});
