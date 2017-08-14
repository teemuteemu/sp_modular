import React from 'react';

import Let from 'components/Let';
import Parameter from 'components/Parameter';

import './module.scss';

class Module extends React.Component {
  constructor (props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseDown (prox, evt) {
    const {
      selectable
    } = this.props;

    if (selectable) {
      const { id } = this.props.moduleDef;
      this.props.selectModule(id);

      window.addEventListener('mouseup', this.onMouseUp, false);
      window.addEventListener('mousemove', this.onMouseMove, false);
    }
  }

  onMouseUp () {
    this.props.unselectModule();

    window.removeEventListener('mouseup', this.onMouseUp, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);
  }

  onMouseMove (evt) {
    const {
      clientX,
      clientY
    } = evt;
    const {
      id
    } = this.props.moduleDef;

    this.props.setModulePosition(id, [clientX, clientY]);
  }
  
  componentDidMount() {
    const dragGroup = this.refs.dragGroup;
    dragGroup.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount () {
    const dragGroup = this.refs.dragGroup;
    dragGroup.removeEventListener('mousedown', this.onMouseDown);
  }

  render () {
    const {
      moduleDef,
      isSelected
    } = this.props;
    const {
      id
    } = moduleDef;
    const [
      x,
      y
    ] = moduleDef.position;
    const moduleTranslate = `translate(${x}, ${y})`;
    const className = [
      'module',
      isSelected ? 'module--selected' : ''
    ].join(' ');

    return (
      <g
        ref='dragGroup'
        className={className}
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
          { moduleDef.inlets.map((l, i) => <Let inlet={true} key={i} moduleId={id} name={l} index={i} />) }
          { moduleDef.outlets.map((l, i) => <Let inlet={false} key={i} moduleId={id} name={l} index={i} />) }
        </g>
        <g
          className='module__params'>
          { Object.keys(moduleDef.params).map((p, i) => <Parameter key={i} moduleId={id} name={p} param={moduleDef.params[p]} />) }
        </g>
      </g>
    );
  }
}

Module.propTypes = {
  moduleDef: React.PropTypes.object,
  isSelected: React.PropTypes.bool,
  selectModule: React.PropTypes.func,
  unselectModule: React.PropTypes.func,
  setModulePosition: React.PropTypes.func
};

export default Module;

