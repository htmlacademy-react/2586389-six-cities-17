import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/types.ts';
import {SORT_TYPE} from '../variables/variables.tsx';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offers[]>('offers/loadOffers');
export const changeSorting =createAction<typeof SORT_TYPE>('offers/changeSorting');
