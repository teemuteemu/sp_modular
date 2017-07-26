import React from 'react';
import {Provider} from 'react-redux';
import { render } from 'react-dom';

import store from 'store';
import Patcher from 'components/Patcher';

import '../styles/index.scss';

const element = document.querySelector('#app');

render(
  <Provider store={store}>
    <Patcher />
  </Provider>
  , element);
