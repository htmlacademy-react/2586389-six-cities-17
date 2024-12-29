import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/types.ts';

export const changeCity = createAction<string>('city/changeCity');
export const loadOffers = createAction<Offers[]>('offers/loadOffers');
