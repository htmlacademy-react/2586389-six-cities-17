import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

export const getPostingStatus = (state: AppState) => state[NameSpace.Reviews].posingStatus;
export const getReviewsStatus = (state: AppState) => state[NameSpace.Reviews].status;
export const getReviews = (state: AppState) => state[NameSpace.Reviews].data;
