export const SORT_TYPE = {
  popular: 'Popular',
  price_low: 'Price: low to high',
  price_high: 'Price: high to low',
  top_rated: 'Top rated first',
};
export const MIN_LENGTH_OF_REVIEW = 50;
export const MAX_LENGTH_OF_REVIEW = 300;

export const MarkerInfo = {
  UrlDef: '/public/img/pin.svg',
  UrlAct: '/public/img/pin-active.svg',
  Width: 20,
  Height: 40,
  Left: 20,
  Top: 40
} as const;

export type SortType = typeof SORT_TYPE[keyof typeof SORT_TYPE]
