import {describe, it} from 'vitest';
import {NameSpace} from '../../../const.ts';
import {DefCityName, SortTypeList} from '../../../variables/variables.tsx';
import {getRandomInteger} from '../../../utils/utlis.ts';
import {AppState} from '../../../types/state.ts';
import {makeFakeOffers} from '../../../utils/mocks/mocks.ts';
import {getAllOffers, getSelectedCity, getSortedOffers, getSortingType} from '../offers-selector.ts';

describe('OfferExtended selectors', () => {
  const state: AppState = {
    [NameSpace.OffersSpace]: {
      cityName: DefCityName,
      all: Array.from({length: getRandomInteger(0, 120)}, makeFakeOffers),
      sorted: Array.from({ length: getRandomInteger(0, 20) }, makeFakeOffers),
      sortingType: SortTypeList.popular,
    }
  } as AppState;

  it('Should return selected city from state', () => {
    const {cityName} = state[NameSpace.OffersSpace];
    const result = getSelectedCity(state);
    expect(result).toBe(cityName);
  });

  it('Should return all offers from state', () => {
    const {all} = state[NameSpace.OffersSpace];
    const result = getAllOffers(state);
    expect(result).toBe(all);
  });

  it('Should return sorting type from state', () => {
    const {sortingType} = state[NameSpace.OffersSpace];
    const result = getSortingType(state);
    expect(result).toBe(sortingType);
  });

  it('Should return sorted offers from state', () => {
    const {sorted} = state[NameSpace.OffersSpace];
    const result = getSortedOffers(state);
    expect(result).toBe(sorted);
  });
});
