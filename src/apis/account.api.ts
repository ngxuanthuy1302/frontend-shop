import { Method, request } from '../helper/request.helper';
import { IAccount } from '../interface/account.interface';

export class AccountAPI {
  static readonly COMPONENT_NAME: string = 'accounts';

  static login = (data: { email: string; password: string }) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/login`,
      data: data,
    });
  };

  static create = (data: IAccount) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static getUser = (id: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };
}
