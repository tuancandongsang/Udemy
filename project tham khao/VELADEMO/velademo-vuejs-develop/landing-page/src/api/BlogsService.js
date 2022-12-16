import request from "./request";

const API_ENDPOINT = {
    GET_LIST_BLOGS: "/api/blogs",
    GET_SEARCH_BLOGS:'/api/blogs'
};
class BlogsService {
    constructor() {
        if (BlogsService._instance) {
            return BlogsService._instance;
        }
        BlogsService._instance = this;
    }
    getListBlogs(pageNumber, pageSize) {
        return request.get(API_ENDPOINT.GET_LIST_BLOGS + `?page=${pageNumber}&size=${pageSize}`);
    }
    getSearchBlogs(pageNumber, pageSize, text){
        return request.get(API_ENDPOINT.GET_SEARCH_BLOGS +  `?page=${pageNumber}&size=${pageSize}&title=${text}`)
    }
}

const Service = new BlogsService();

export default Service;
