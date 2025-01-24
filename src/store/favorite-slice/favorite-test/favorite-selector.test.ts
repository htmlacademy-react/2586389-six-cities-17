import {describe, it} from 'vitest';
import {NameSpace, DataStatus} from '../../../const.ts';
import {getRandomInteger} from '../../../utils/utlis.ts';
import {makeFakeOffers} from '../../../utils/mocks/mocks.ts';
import {getFavoriteOffers} from '../favorite-selector.ts';
import {AppState} from '../../../types/state.ts';

describe('Favorite selectors', () => {
  const state: AppState = {
    [NameSpace.Favorite]: {
      data: Array.from({length: getRandomInteger(0, 10)}, makeFakeOffers),
      status: DataStatus.Unknown,
    }
  } as AppState;

  it('Should return favorite offers data from state', () => {
    const {data} = state[NameSpace.Favorite];
    const result = getFavoriteOffers(state);
    expect(result).toBe(data);
  });
});
