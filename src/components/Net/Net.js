import React from 'react';

import Path from 'svg-path-generator';

import './net.scss';

const Net = ({ net, netToCoords }) => {
  const coordinates = netToCoords(net);
  const data = Path()
    .moveTo(coordinates[0][0], coordinates[0][1])
    .lineTo(coordinates[1][0], coordinates[1][1])
    .end();

  return (
    <path
      className='net'
      d={data} />
  );
};

export default Net;
