import { IBase } from './base.interface';
import { ICategory } from './category.interface';

export interface IProduct extends IBase {
  name?: string;
  image?: string[];
  descaption?: string;
  price?: number;
  size?: string[];
  path?: string;
  categoriesId?: string;
  collectionId?: string;
  categories?: ICategory;
}
