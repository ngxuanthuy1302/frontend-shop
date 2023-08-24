import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: string = 'none';

export const DisplaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    SetDisplay: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { SetDisplay } = DisplaySlice.actions;

export const GetDisplay = (state: RootState) => state.display;
export default DisplaySlice.reducer;
