import {describe, it} from 'vitest';
import {NameSpace, PostingStatus} from '../../../const.ts';
import {makeFakeReviews} from '../../../utils/mocks/mocks.ts';
import {AppState} from '../../../types/state.ts';
import {getRandomInteger} from '../../../utils/utlis.ts';
import {getPostingStatus, getReviews} from '../reviews-selector.ts';

describe('Reviews selectors', () => {
  const state: AppState = {
    [NameSpace.Reviews]: {
      data: Array.from({length: getRandomInteger(0, 10)}, makeFakeReviews),
      postingStatus: PostingStatus.Unknown,
    }
  } as AppState;

  it('Should return posting status from state', () => {
    const {postingStatus} = state[NameSpace.Reviews];
    const result = getPostingStatus(state);
    expect(result).toBe(postingStatus);
  });

  it('Should return offer data status from state', () => {
    const {data} = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toBe(data);
  });
});
