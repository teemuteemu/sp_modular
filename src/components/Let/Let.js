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
      inlet,
      moduleId,
      name
    } = this.props;

    this.props.selectLetFrom(inlet, moduleId, name);

    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }

  onMouseUp () {
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    
    this.props.connectLets();
    this.props.unselectLetFrom();
  }

  onMouseOut () {
    const {
      unselectLetTo
    } = this.props;

    unselectLetTo();

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
      selectedLetFrom,
      isSelected,
      selectLetTo
    } = this.props;

    if (
      selectedLetFrom.name 
      && selectedLetFrom.moduleId
      && selectedLetFrom.name !== name 
      && selectedLetFrom.moduleId !== moduleId
      && selectedLetFrom.inlet !== inlet
    ) {
      const thisLet = {
        inlet,
        name,
        moduleId
      };

      selectLetTo(inlet, moduleId, name);

      this.setState({
        canConnect: true
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
      canConnect
    } = this.state;
    const {
      inlet,
      name,
      index,
      isSelected
    } = this.props;

    const className = [
      'let',
      inlet ? 'let--in' : 'let--out',
      isSelected || canConnect ? 'let--selected' : ''
    ].join(' ');

    const sx = inlet
      ? 12
      : 128;
    const sy = 32 + (16 * index);
    const tx = inlet
      ? sx + 12
      : sx - 44;
    const ty = sy + 6;

    return (
      <g
        ref='dragGroup'
        className={className}>
        <circle
          className='let__socket'
          cx={sx}
          cy={sy} />
        <text
          className='let__name'
          x={tx}
          y={ty}>
          { name }
        </text>
      </g>
    );
  }
}

Let.propTypes = {
};

export default Let;
