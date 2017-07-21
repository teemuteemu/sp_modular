import createNode from './blueprint';

import '../../styles/common/module.scss';

const Noise = {
  name: 'Noise',
  outlets: [
    'OUTLET_0'
  ],
  src: `
    OUTLET_0[i] = Math.random();
  `
};

export default createNode(Noise);
