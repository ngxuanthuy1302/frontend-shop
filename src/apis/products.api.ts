import { Method, request } from '../helper/request.helper';

export class ProductAPI {
  static readonly COMPONENT_NAME: string = 'products';

  static fetchAll = (type?: string, detail?: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: type ? `${type}Id:"${detail}"` : {},
          order: 'createdAt DESC',
        },
      },
    });
  };

  static fetchByCollections = (detail?: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { collectionId: detail },
          order: 'createdAt DESC',
        },
      },
    });
  };

  static fetchByCategories = (detail?: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { categoriesId: detail },
          order: 'createdAt DESC',
        },
      },
    });
  };

  static fetchAllbyPaginate = (skip: number, limit?: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          limit: limit,
          skip: skip,
          order: 'createdAt DESC',
        },
      },
    });
  };
  static fetchCollecbyPaginate = (skip: number, limit?: number, detail?: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { collectionId: detail },
          limit: limit,
          skip: skip,
          order: 'createdAt DESC',
        },
      },
    });
  };
  static fetchCategorybyPaginate = (skip: number, limit?: number, detail?: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { categoriesId: detail },
          limit: limit,
          skip: skip,
          order: 'createdAt DESC',
        },
      },
    });
  };

  static newProduct = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          limit: 10,
          order: 'createdAt DESC',
        },
      },
    });
  };

  static single = (id: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { id: id },
          limit: 1,
          order: 'createdAt DESC',
        },
      },
    });
  };

  static findbyName = (name: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { name: { like: name } },
          order: 'createdAt DESC',
        },
      },
    });
  };
}
