import React from 'react';

import Let from 'components/Lets';

import './module.scss';

class Module extends React.Component {
  render () {
    const {
      moduleDef
    } = this.props;
    const x = moduleDef.position[0];
    const y = moduleDef.position[1];
    const moduleTranslate = `translate(${x}, ${y})`;

    const moduleTitle = {
      x: 4,
      y: 16
    };

    return (
      <g
        className='module'
        transform={moduleTranslate}>
        <rect
          className='module__box'
          x={0}
          y={0} />
        <text
          className='module__title'
          x={moduleTitle.x}
          y={moduleTitle.y}>
          { moduleDef.name }
        </text>
        <g
          className='module__lets'>
          { moduleDef.inlets.map((l, i) => <Let inlet={true} key={i} data={l} index={i} />) }
          { moduleDef.outlets.map((l, i) => <Let inlet={false} key={i} data={l} index={i} />) }
        </g>
      </g>
    );
  }
}

Module.propTypes = {
  moduleDef: React.PropTypes.object
};

export default Module;
