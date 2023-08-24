import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: string = '';

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    SetSearch: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { SetSearch } = SearchSlice.actions;

export const GetSearch = (state: RootState) => state.search;
export default SearchSlice.reducer;
