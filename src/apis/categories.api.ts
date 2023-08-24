import { Method, request } from '../helper/request.helper';

export class CaterotyAPI {
  static readonly COMPONENT_NAME: string = 'categories';

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
    });
  };
}
