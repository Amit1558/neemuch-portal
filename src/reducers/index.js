import { combineReducers } from 'redux';
import postReducer from './posts.js';

const appReducer = combineReducers({postReducer})
  
const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer;