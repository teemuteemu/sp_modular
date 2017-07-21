import React from 'react';
import {Provider} from 'react-redux';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import store from './store';
import Patcher from './patcher';

const element = document.querySelector("#app");

render(
  <Provider store={store}>
    <Patcher />
  </Provider>
  , element);
/*
if (module && module.hot) {
  module.hot.accept('./patcher.js', () => {
    const App = require('./patcher.js').default;
    render(
      <AppContainer>
        <Patcher />
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
*/
