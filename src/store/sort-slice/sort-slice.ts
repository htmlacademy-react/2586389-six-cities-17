import {SortTypeList} from '../../variables/variables.tsx';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  currentSort: SortTypeList.popular
};

const sortSlice = createSlice({
  name: 'sort-slice',
  initialState,
  reducers: {
    changeSorting: (state, action: PayloadAction<string>) => {
      state.currentSort = action.payload;
    },
  },
});

export const { changeSorting } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
export default sortSlice.reducer;
