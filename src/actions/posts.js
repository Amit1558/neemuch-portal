import * as api from '../api/api-call.js';
import { UPDATE, FETCH_ALL, DELETE, CREATE, FETCH_ALL_INVENTORY } from '../constant/constants.js'


export const fetch = () => async (dispatch) => {
  try {
    const { data } = await api.feedBack();
    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error.message);
  }
}

export const fetchInventory = () => async (dispatch) => {
  try {
    const { data : { data: { content } } } = await api.inventoryFetchAll();
    console.log(content);
    dispatch({ type: FETCH_ALL_INVENTORY, payload: content })
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (posts) => async (dispatch) => {
  try {
    const response = await api.createPost(posts);
    dispatch({ type: CREATE, payload: response.data.data.loginRequest.username });
  }
  catch (error) {
    console.log(error);
  }
}

export const updatePost = (currentId,posts) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId,posts);
    dispatch({ type: UPDATE, payload: data });
  }
  catch (error) {
    console.log(error);
  }
}

export const deletePost= (id) => async (dispatch) =>{
    try {

    await api.deletePost(id);
    dispatch({ type:DELETE, payload: id });

    } catch (error) {
       console.log(error);
    }
}

export const deleteInventoryById= (id) => async (dispatch) =>{
  try {
    console.log(id);
  await api.deleteInvenById(id);
  dispatch({ type:DELETE, payload: id });

  } catch (error) {
     console.log(error);
  }
}