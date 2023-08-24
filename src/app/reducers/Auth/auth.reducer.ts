import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IAccount } from '../../../interface/account.interface';

const initialState: IAccount = {};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetAuth: (state, action: PayloadAction<IAccount>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { SetAuth } = AuthSlice.actions;

export const GetAuth = (state: RootState) => state.auth;
export default AuthSlice.reducer;
