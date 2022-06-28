import { combineReducers, legacy_createStore } from 'redux';
import pagesReducer from './pages-reducer';
import bagReducer from './bag-reducer';

let reducers = combineReducers({
  pages: pagesReducer,
  bag: bagReducer,
});

let store = legacy_createStore(reducers);
export default store;
