import React from 'react';

import './lets.scss';

export const Inlet = ({ data }) => {
  return (
    <div className='let let--in'>{data}</div>
  );
};

export const Outlet = ({ data }) => {
  return (
    <div className='let let--out'>{data}</div>
  );
};
