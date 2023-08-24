import { IBase } from './base.interface';
import { IProduct } from './product.interface';

interface ICartProduct {
  product: IProduct;
  sizeSelect: string;
  count: number;
}
export interface ICart extends IBase {
  accountsId?: string;
  products?: ICartProduct[];
  totalProducts?: number;
  totalMoney?: number;
}
