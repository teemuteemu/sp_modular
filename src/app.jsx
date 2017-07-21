import React from 'react';

import Module from './components/common/Module';

import AudioOut from './modules/AudioOut';
import Noise from './modules/Noise';

import '../styles/index.scss';

export default class App extends React.Component {
  render() {
    const modules = [
      AudioOut,
      Noise
    ];

    return (
      <div className="patcher">
        { modules.map(m => <Module key={m.name} moduleDef={m} />) }
      </div>
    )
  }
}
