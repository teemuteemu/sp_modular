import React from 'react';

import { Inlet, Outlet } from 'components/Lets';

import './module.scss';

class Module extends React.Component {
  render () {
    const {
      moduleDef
    } = this.props;
    const style = {
      top: moduleDef.position[0],
      left: moduleDef.position[1]
    };

    return (
      <div className='module' style={style}>
        <div className='title'>
          { moduleDef.name }
        </div>
        <div className='lets'>
          <div className='lets__in'>
            { moduleDef.inlets.map(i => <Inlet key={i} data={i} />) }
          </div>
          <div className='lets_out'>
            { moduleDef.outlets.map(i => <Outlet key={i} data={i} />) }
          </div>
        </div>
      </div>
    );
  }
}

Module.propTypes = {
  moduleDef: React.PropTypes.object
};

export default Module;
