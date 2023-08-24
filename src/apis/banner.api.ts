// import { IBanner } from "../interface/banner.interface";
import { Method, request } from '../helper/request.helper';

export class BannerAPI {
  static readonly COMPONENT_NAME: string = 'banners';

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
    });
  };
}
