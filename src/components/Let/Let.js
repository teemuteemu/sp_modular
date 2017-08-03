import React from 'react';

import './lets.scss';

class Let extends React.Component {
  constructor (props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    this.state = {
      canConnect: null
    };
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

  onMouseOut () {
    this.setState({
      canConnect: null
    });
  }

  onMouseOver () {
    const {
      inlet,
      name,
      moduleId,
      index,
      selectedLet,
      isSelected
    } = this.props;

    if (selectedLet.name && selectedLet.moduleId && selectedLet.name !== name && selectedLet.moduleId !== moduleId) {
      const newNet = [
        `${selectedLet.name}_${selectedLet.moduleId}`,
        `${name}_${moduleId}`
      ];
      console.log(newNet)

      this.setState({
        canConnect: newNet
      });
    }
  }

  componentDidMount () {
    const dragGroup = this.refs.dragGroup;
    dragGroup.addEventListener('mousedown', this.onMouseDown);
    dragGroup.addEventListener('mouseover', this.onMouseOver);
    dragGroup.addEventListener('mouseout', this.onMouseOut);
  }

  render () {
    const {
      inlet,
      name,
      index,
      isSelected
    } = this.props;
    const className = [
      'let',
      inlet ? 'let--in' : 'let--out',
      isSelected ? 'let--selected' : '',
      this.state.canConnect ? 'let--connect' : ''
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
