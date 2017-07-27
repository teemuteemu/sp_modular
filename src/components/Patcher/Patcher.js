import React from 'react';

import './patcher.scss';

import Module from 'components/Module';
import Net from 'components/Net';

class Patcher extends React.Component {
  componentDidMount () {
    this.props.refresh();
  }

  findModule (id) {
    const {
      patch
    } = this.props;

    return patch.modules
      .find(m => m.id === id);
  }

  netToCoords (net) {
    const [output, input] = net;
    const [outLet, outModuleId] = output.split('_');
    const [inLet, inModuleId] = input.split('_');

    const inModule = this.findModule(inModuleId);
    const outModule = this.findModule(outModuleId);

    return [
      inModule.position,
      outModule.position
    ];
  }

  render () {
    const {
      patch
    } = this.props;

    return (
      <div className='patcher'>
        <svg xmlns='http://www.w3.org/2000/svg'>
          <g className='modules'>
          { patch.modules.map(m => <Module key={m.id} moduleDef={m} position={m.position} />) }
          { patch.nets.map(n => <Net key={n.id} net={n} netToCoords={this.netToCoords.bind(this)} />) }
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
