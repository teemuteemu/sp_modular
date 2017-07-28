import {
  createStore,
  combineReducers
} from 'redux';

import patch from './reducers/patch';

const reducers = {
  patch
};

const store = createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
