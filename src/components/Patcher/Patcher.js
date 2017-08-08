import React from 'react';

import './patcher.scss';

import Module from 'components/Module';
import Net from 'components/Net';

import AudioOut from '../../audio/modules/AudioOut';
import Noise from '../../audio/modules/Noise';
import Pulse from '../../audio/modules/Pulse';
import VCA from '../../audio/modules/VCA';
import LFO from '../../audio/modules/LFO';

class Patcher extends React.Component {
  componentDidMount () {
    this.props.refresh();

    this.props.addModule(new AudioOut());
    this.props.addModule(new Noise());
    this.props.addModule(new Pulse());
  }

  netToCoords (net) {
    const [output, input] = net;
    const [outLet, outModuleId] = output.split('_');
    const [inLet, inModuleId] = input.split('_');
    const inModule = this.props.patch.modules[inModuleId];
    const outModule = this.props.patch.modules[outModuleId];
    const inIndex = inModule.inlets.indexOf(inLet);
    const outIndex = outModule.outlets.indexOf(outLet);

    const inX = inModule.position[0] + 12;
    const inY = inModule.position[1] + 32 + (16 * inIndex);
    const outX = outModule.position[0] + 128;
    const outY = outModule.position[1] + 32 + (16 * outIndex);

    return [
      [ inX, inY ],
      [ outX, outY ]
    ];
  }

  render () {
    const {
      patch
    } = this.props;
    const modules = Object.keys(patch.modules);
    const nets = Object.keys(patch.nets);

    return (
      <div className='patcher'>
        <svg xmlns='http://www.w3.org/2000/svg'>
          <g className='modules'>
          { modules.map(m => <Module key={m} moduleDef={patch.modules[m]} position={patch.modules[m].position} />) }
          { nets.map(n => <Net key={n} net={patch.nets[n]} netToCoords={this.netToCoords.bind(this)} />) }
          </g>
        </svg>
      </div>
    );
  }
}

Patcher.propTypes = {
  refresh: React.PropTypes.func,
  patch: React.PropTypes.object
};

export default Patcher;
