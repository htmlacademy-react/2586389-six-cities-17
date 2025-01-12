import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/types.ts';
import {SortType} from '../variables/variables.tsx';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offers[]>('offers/loadOffers');
export const changeSorting = createAction<SortType>('offers/changeSorting');
