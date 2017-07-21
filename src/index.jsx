import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Patcher from './patcher';

render( <AppContainer><Patcher/></AppContainer>, document.querySelector("#app"));

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
