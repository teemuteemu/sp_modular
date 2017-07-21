import createNode from './blueprint';

import '../../styles/common/module.scss';

const AudioOutModule = {
  name: 'Audio out',
  inlets: [
    'INLET_0',
  ],
  src: `
    OUT_BUFFER[i] = INLET_0[i];
  `
};

export default createNode(AudioOutModule);
