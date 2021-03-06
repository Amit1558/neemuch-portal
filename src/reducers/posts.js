import { UPDATE, FETCH_ALL, DELETE, CREATE, FETCH_ALL_INVENTORY} from '../constant/constants.js'

const postReducer = (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case FETCH_ALL:
    return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);
    default:
      return posts;
  }
}

export default postReducer;