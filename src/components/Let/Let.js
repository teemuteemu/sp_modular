import React from 'react';

import './lets.scss';

class Let extends React.Component {
  constructor (props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown (pr, evt) {
    const {
      moduleId,
      name
    } = this.props;

    this.props.selectLet(moduleId, name);

    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  onMouseUp () {
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);

    this.props.unselectLet();
  }

  componentDidMount () {
    const dragGroup = this.refs.dragGroup;
    dragGroup.addEventListener('mousedown', this.onMouseDown);
  }

  render () {
    const {
      inlet,
      name,
      index,
      selected
    } = this.props;
    const className = [
      'let',
      inlet ? 'let--in' : 'let--out',
      selected ? 'let--selected' : ''
    ].join(' ');

    const x = inlet
      ? 4
      : 120;
    const y = 32 + (16 * index);

    return (
      <g
        ref='dragGroup'
        className={className}>
        <rect
          className='let__rect'
          x={x}
          y={y} />
        <text
          className='let__name'
          x={x + 16}
          y={y + 12}>
          { name }
        </text>
      </g>
    );
  }
}

export default Let;
