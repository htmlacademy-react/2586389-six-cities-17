import {OffersProcess} from '../../types/types.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  addToFavoriteOffer,
  fetchOffers,
  removeToFavoriteOffer
} from '../api-actions.ts';
import {
  DefCityLocation,
  DefCityName,
  SortType,
  SortTypeList,
  UpdateFavoriteStatus
} from '../../const.ts';
import {DataStatus} from '../../const.ts';
import {defineCityLocation, getOffersByCityName, sortOffers} from '../../utils/utlis.ts';

export const initialState: OffersProcess = {
  cityName: DefCityName,
  cityLocation: DefCityLocation,
  all: [],
  sorted: [],
  sortingType: SortTypeList.popular,
  status: DataStatus.Unknown
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
      state.sortingType = SortTypeList.popular;
      state.sorted = getOffersByCityName(state.all, state.cityName);
      state.cityLocation = defineCityLocation(state.sorted);
    },
    changeSorting: (state, action: PayloadAction<SortType>) => {
      state.sortingType = action.payload || SortTypeList.popular;
      state.sorted = sortOffers(getOffersByCityName(state.all, state.cityName), action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = DataStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.all = action.payload;
        state.status = DataStatus.Loaded;
        state.sorted = getOffersByCityName(state.all, state.cityName);
        state.cityLocation = defineCityLocation(state.sorted);
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.status = DataStatus.Error;
      })
      .addCase(addToFavoriteOffer.fulfilled, (state, action) => {
        state.all = UpdateFavoriteStatus(state.all, action.payload, true);
        state.sorted = getOffersByCityName(state.all, state.cityName);
      })
      .addCase(removeToFavoriteOffer.fulfilled, (state, action) => {
        state.all = UpdateFavoriteStatus(state.all, action.payload, false);
        state.sorted = getOffersByCityName(state.all, state.cityName);
      });
  }
});

export const { changeCity, changeSorting } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
export default offersSlice.reducer;
