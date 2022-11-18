import BaseService from './baseService';
import API from './api';
import constants from '../config/constants';

export default class MDOService extends BaseService {
  static async getBlogs(page = 1, type = constants.BLOG_TYPES.BLOG) {
    const params = {
      sort: ['updatedAt:desc'],
      populate: {
        thumbnail: {
          fields: ['url', 'formats']
        },
        categories: {
          fields: ['*']
        }
      },
      pagination: {
        pageSize: constants.PAGE_SIZE,
        page: page
      }
    };
    const api =
        type === constants.BLOG_TYPES.BLOG ? API.URL_BLOGS : API.URL_NEWS;
    const url = `${api}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getFeatureBlog(pageSize = 1, type = constants.BLOG_TYPES.BLOG) {
    const params = {
      sort: ['updatedAt:desc'],
      fields: [
        'title',
        'slug',
        'description',
        'updatedAt',
        'updatedAt',
        'createdAt',
        'isFeature'
      ],

      filters: {
        isFeature: {$eq: true}
      },
      populate: {
        thumbnail: {
          fields: ['url', 'formats']
        },
        categories: {
          fields: ['name', 'slug']
        }
      },
      pagination: {
        pageSize: pageSize,
        page: 1
      }
    };
    const api =
        type === constants.BLOG_TYPES.BLOG ? API.URL_BLOGS : API.URL_NEWS;
    const url = `${api}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getBlogDetail(slug) {
    const params = {
      filters: {
        slug: {$eq: slug}
      },
      populate: {
        thumbnail: {
          fields: ['url']
        },
        categories: {
          fields: ['name', 'slug']
        },
        seo: {
          populate: '*'
        }
      },
      pagination: {
        pageSize: 1,
        page: 1
      }
    };
    const url = `${API.URL_BLOGS}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getNewsDetail(slug) {
    const params = {
      filters: {
        slug: {$eq: slug}
      },
      populate: {
        thumbnail: {
          fields: ['url']
        }
      },
      pagination: {
        pageSize: 1,
        page: 1
      }
    };
    const url = `${API.URL_NEWS}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getCustomersType(
      page = 1,
      type = constants.CUSTOMER_TYPES.CUSTOMER
  ) {
    const params = {
      sort: ['createdAt:desc'],
      filters: {
        type: {$eq: type}
      },
      populate: {
        logo: {
          fields: ['url', 'formats']
        }
      },
      pagination: {
        pageSize: 100,
        page: page
      }
    };
    const url = `${API.URL_CUSTOMERS}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getCustomersStories(page = 1) {
    const params = {
      sort: ['createdAt:desc'],
      populate: {
        avatar: {
          fields: ['url', 'formats']
        },
        logoCompany: {
          fields: ['url', 'formats']
        }
      },
      pagination: {
        pageSize: 100,
        page: page
      }
    };
    const url = `${API.URL_CUSTOMER_STORIES}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getCategories() {
    const params = {
      pagination: {
        pageSize: 100,
        page: 1
      }
    };
    const url = `${API.URL_CATEGORIES}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async searchBlog(keyword, page) {

    const param = {
      sort: ['createdAt:desc'],
      filters: {
        title: {
          $contains: keyword
        }
      },
      populate: {
        thumbnail: {
          fields: ['url', 'formats']
        },
        categories: {
          fields: ['*']
        }
      },
      pagination: {
        pageSize: constants.PAGE_SIZE,
        page: page
      }
    };
    const url = `${API.URL_BLOGS}?${this.querystring(param)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async getBlogsByCategory(page, slug) {
    const params = {
      sort: ['createdAt:desc'],
      filters: {
        categories: {
          slug: {
            $eq: slug
          }
        }
      },
      populate: {
        thumbnail: {
          fields: ['url', 'formats']
        },
        categories: {
          fields: ['*']
        }
      },
      pagination: {
        pageSize: constants.PAGE_SIZE,
        page: page
      }
    };
    const url = `${API.URL_BLOGS}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getBlogsByCategoryAndKeyWordContaing(page, slug, keyword) {
    const params = {
      sort: ['createdAt:desc'],
      filters: {
        categories: {
          slug: {
            $eq: slug
          }
        },
        slug: {
          $contain: keyword
        }
      },
      populate: {
        thumbnail: {
          fields: ['url', 'formats']
        },
        categories: {
          fields: ['*']
        }
      },
      pagination: {
        pageSize: constants.PAGE_SIZE,
        page: page
      }
    };
    const url = `${API.URL_BLOGS}?${this.querystring(params)}`;
    try {
      const response = await this.request().get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
