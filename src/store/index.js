import {
  createStore,
  combineReducers
} from 'redux';

import patch from './reducers/patch';

const reducers = {
  patch
};

const store = createStore(combineReducers(reducers))

export default store;
