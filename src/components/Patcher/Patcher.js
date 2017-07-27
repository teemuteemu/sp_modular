import React from 'react';

import './patcher.scss';

import Module from 'components/Module';
import Net from 'components/Net';

class Patcher extends React.Component {
  componentDidMount () {
    this.props.refresh();
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
          { patch.nets.map(n => <Net key={n.id} net={n} />) }
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
