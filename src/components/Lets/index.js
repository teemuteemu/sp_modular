import React from 'react';

import './lets.scss';

const Let = ({ data, index, inlet }) => {
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
};

export default Let;
