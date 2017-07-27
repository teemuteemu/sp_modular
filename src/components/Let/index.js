import React from 'react';

import './lets.scss';

class Let extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dragOn: false
    };
  }

  onMouseDown (pr, evt) {
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);

    this.setState({
      dragOn: true
    });
  }

  onMouseUp () {
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);

    this.setState({
      dragOn: false
    });
  }

  render () {
    const {
      inlet,
      data,
      index
    } = this.props;
    const {
      dragOn
    } = this.state;
    const className = [
      'let',
      inlet ? 'let--in' : 'let--out',
      dragOn ? 'let--selected' : ''
    ].join(' ');

    const onMouseDown = this.onMouseDown.bind(this);
    const onMouseUp = this.onMouseUp.bind(this);

    const x = inlet
      ? 4
      : 120;
    const y = 32 + (16 * index);

    return (
      <g className={className}>
        <rect
          className='let__rect'
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          x={x}
          y={y} />
        <text
          className='let__name'
          x={x + 16}
          y={y + 12}>
          { data }
        </text>
      </g>
    );
  }
}

export default Let;
