import { Method, request } from '../helper/request.helper';

export class CollectionAPI {
  static readonly COMPONENT_NAME: string = 'collections';

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
    });
  };
}
