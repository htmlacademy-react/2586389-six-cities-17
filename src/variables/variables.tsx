import { StatusCodes } from 'http-status-codes';

export const SortTypeList = {
  popular: 'Popular',
  priceLow: 'Price: low to high',
  priceHigh: 'Price: high to low',
  topRated: 'Top rated first',
};
export const MinLengthOfReview = 50;
export const MaxLengthOfReview = 300;

export const MarkerInfo = {
  UrlDef: 'img/pin.svg',
  UrlAct: 'img/pin-active.svg',
  Width: 28,
  Height: 40,
  Left: 14,
  Top: 40
} as const;

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true,
};

export const BackendUrl = 'https://16.design.htmlacademy.pro/six-cities';
export const RequestTimeout = 5000;

export type SortType = typeof SortTypeList[keyof typeof SortTypeList]
