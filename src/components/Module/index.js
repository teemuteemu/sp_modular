import React from 'react';

import { Inlet, Outlet } from 'components/Lets';

import './module.scss';

const Module = ({ moduleDef }) => {
  const style = {
    top: moduleDef.position[0],
    left: moduleDef.position[1]
  };

  return (
    <div className='module' style={style}>
      <p>{ moduleDef.name }</p>
      <div>
        <div>
          { moduleDef.inlets().map(i => <Inlet key={i} data={i} />) }
        </div>
        <div>
          { moduleDef.outlets().map(i => <Outlet key={i} data={i} />) }
        </div>
      </div>
    </div>
  );
};

export default Module;
