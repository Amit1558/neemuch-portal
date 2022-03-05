import axios from 'axios';
import { URL_FETCH_NEWS, URL_DELETE_NEWS, URL_CREATE_NEWS, URL_INVENTORY_FETCH_ALL, URL_DELETE_INVENTORY, URL_UPDATE_INVENTORY, URL_CREATE_INVENTORY } from '../constant/endpoints.js'

const url = "https://neemuch-news.herokuapp.com";
const API = axios.create({ baseURL: 'https://neemuch-news.herokuapp.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('access-token')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('access-token')}`;
    }

    return req;
});

export const feedBack = () => API.get(`${URL_FETCH_NEWS}`);

export const createPost = (post) => API.post(`${url}/v1/api/auth/admin/signin`, post);

export const createNews = (post) => API.post(URL_CREATE_NEWS, post);

export const updatePost = (post) => API.put(`${url}/v1/newsMaster/updateNews`, post)

export const deletePost = (id) => API.delete(`${URL_DELETE_NEWS}/${id}`);

export const deleteInvenById = (id) => API.delete(`${URL_DELETE_INVENTORY}/${id}`);

export const inventoryFetchAll = () => API.get(`${URL_INVENTORY_FETCH_ALL}`);

export const updateInventory = (post) => API.put(`${URL_UPDATE_INVENTORY}`, post);

export const createInventory = (post) => API.post(`${URL_CREATE_INVENTORY}`, post)