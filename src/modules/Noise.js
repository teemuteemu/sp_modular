import createNode from './blueprint';

import '../../styles/common/module.scss';

const Noise = {
  name: 'Noise',
  outlets: [
    'OUTLET_NOISE'
  ],
  src: `
    OUTLET_NOISE[i] = Math.random();
  `
};

export default createNode(Noise);
