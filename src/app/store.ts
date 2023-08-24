import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import displayReducer from './reducers/Display/display.reducer';
import authReducer from './reducers/Auth/auth.reducer';
import searchReducer from './reducers/Search/search.reducer';
import cartReducer from './reducers/Cart/cart.reducer';
export const store = configureStore({
  reducer: {
    display: displayReducer,
    auth: authReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
