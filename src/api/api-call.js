import axios from 'axios';
import { URL_FETCH_NEWS, URL_DELETE_NEWS, URL_INVENTORY_FETCH_ALL, URL_DELETE_INVENTORY } from '../constant/endpoints.js'
import   axiosAuth   from '../authentication/jwtauthentication.js';

const url = "https://neemuch-news.herokuapp.com";

export const feedBack = () => axios.get(`${URL_FETCH_NEWS}`);

export const createPost = (post) => axios.post(`${url}/v1/api/auth/admin/signin`, post);

export const updatePost = (id, post) => axios.put(`${url}/${id}`, post)

export const deletePost = (id) => axios.delete(`${URL_DELETE_NEWS}/${id}`);

export const deleteInvenById = (id) => axios.delete(`${URL_DELETE_INVENTORY}/${id}`);

export const inventoryFetchAll = () => axios.get(`${URL_INVENTORY_FETCH_ALL}`);