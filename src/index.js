import React from 'react';
import {Provider} from 'react-redux';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import store from 'store';
import Patcher from 'components/Patcher';

const element = document.querySelector("#app");

render(
  <Provider store={store}>
    <Patcher />
  </Provider>
  , element);
