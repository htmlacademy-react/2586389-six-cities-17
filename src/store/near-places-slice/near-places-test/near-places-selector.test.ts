import {describe, it} from 'vitest';
import {NameSpace, DataStatus} from '../../../const.ts';
import {getRandomInteger} from '../../../utils/utlis.ts';
import {makeFakeOffers} from '../../../utils/mocks/mocks.ts';
import {AppState} from '../../../types/state.ts';
import {getNearPlaces} from '../near-places-selector.ts';

describe('NearPlaces selectors', () => {
  const state: AppState = {
    [NameSpace.NearPlaces]: {
      data: Array.from({length: getRandomInteger(0, 10)}, makeFakeOffers),
      status: DataStatus.Unknown,
    }
  } as AppState;

  it('Should return near places data from state', () => {
    const {data} = state[NameSpace.NearPlaces];
    const result = getNearPlaces(state);
    expect(result).toBe(data);
  });
});
