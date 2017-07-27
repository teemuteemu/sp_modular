import React from 'react';

import './lets.scss';

class Let extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      inlet,
      data,
      index
    } = this.props;
    const x = inlet
      ? 4
      : 120;
    const y = 32 + (16 * index);

    return (
      <g className='let let--in'>
        <rect
          className='let__rect'
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
