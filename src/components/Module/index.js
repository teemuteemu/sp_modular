import React from 'react';

import Draggable from 'components/helpers/Draggable';
import Let from 'components/Let';

import './module.scss';

class Module extends Draggable {
  render () {
    const {
      moduleDef
    } = this.props;
    const {
      x,
      y,
      mouseDown
    } = this.state;
    const moduleTranslate = `translate(${x}, ${y})`;
    const className = [
      'module',
      mouseDown ? 'module--selected' : ''
    ].join(' ');

    const onMouseDown = this.onMouseDown.bind(this);
    const onMouseUp = this.onMouseUp.bind(this);

    return (
      <g
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        transform={moduleTranslate}>
        <rect
          className='module__box'
          x={0}
          y={0} />
        <text
          className='module__title'
          x={4}
          y={16}>
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
