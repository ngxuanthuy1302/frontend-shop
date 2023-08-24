import { Method, request } from '../helper/request.helper';
import { ICart } from '../interface/cart.interface';

export class CartAPI {
  static readonly COMPONENT_NAME: string = 'carts';

  static create = (data: ICart) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static update = (id: string, data: ICart) => {
    return request({
      method: Method.PATCH,
      url: `/${this.COMPONENT_NAME}/${id}`,
      data,
    });
  };

  static fetchbyUser = (id: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { accountsId: id },
        },
      },
    });
  };
}
