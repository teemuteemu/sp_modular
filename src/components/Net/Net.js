import React from 'react';

import Path from 'svg-path-generator';

import './net.scss';

const Net = ({ net, netToCoords }) => {
  const coordinates = netToCoords(net);

  const diffs = [coordinates[1][0] - coordinates[0][0], coordinates[1][1] - coordinates[1][0]];
  const bend_x = diffs[0] / 25;
  const bend_y = Math.abs(diffs[1]) / 7;

  const data = Path()
    .moveTo(coordinates[0][0], coordinates[0][1])
    .smoothCurveTo(coordinates[0][0] + bend_x, coordinates[0][1] + bend_y, (coordinates[0][0] + coordinates[1][0]) / 2, coordinates[0][1] + bend_y)
    .smoothCurveTo(coordinates[1][0] - bend_x, coordinates[1][1] + bend_y, coordinates[1][0], coordinates[1][1])
    .end();

  return (
    <path
      className='net'
      d={data} />
  );
};

Net.propTypes = {
  net: React.PropTypes.array,
  netToCoords: React.PropTypes.func
};

export default Net;
