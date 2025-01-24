import {describe, it} from 'vitest';
import {NameSpace, DataStatus} from '../../../const.ts';
import {makeFakeOfferExtended} from '../../../utils/mocks/mocks.ts';
import {AppState} from '../../../types/state.ts';
import {getOfferData, getOfferStatus} from '../offer-extended-selector.ts';

describe('OfferExtended selectors', () => {
  const state: AppState = {
    [NameSpace.Offer]: {
      data: makeFakeOfferExtended(),
      status: DataStatus.Unknown,
    }
  } as AppState;

  it('Should return offer data from state', () => {
    const {data} = state[NameSpace.Offer];
    const result = getOfferData(state);
    expect(result).toBe(data);
  });

  it('Should return offer data status from state', () => {
    const {status} = state[NameSpace.Offer];
    const result = getOfferStatus(state);
    expect(result).toBe(status);
  });
});
