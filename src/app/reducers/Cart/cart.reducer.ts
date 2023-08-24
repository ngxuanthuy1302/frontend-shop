import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IProduct } from '../../../interface/product.interface';

interface ICartProduct {
  product: IProduct;
  sizeSelect: string;
  count: number;
}
const initialState: ICartProduct[] = [];

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    SetCart: (state, action: PayloadAction<ICartProduct[]>) => {
      state = action.payload;
      return state;
    },
    UpdateCart: (state, action: PayloadAction<ICartProduct>) => {
      const index = state.findIndex((el) => el.product === action.payload.product);
      if (index > -1) {
        state[index] = {
          product: action.payload.product,
          sizeSelect: action.payload.sizeSelect,
          count: action.payload.count,
        };
        return state;
      }
    },
    DeleteProductCart: (state, action: PayloadAction<ICartProduct>) => {
      const index = state.findIndex((el) => el === action.payload);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
  },
});

export const { SetCart, UpdateCart, DeleteProductCart } = CartSlice.actions;

export const GetCart = (state: RootState) => state.cart;
export default CartSlice.reducer;
