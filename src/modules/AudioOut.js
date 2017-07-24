import createNode from './blueprint';

import '../../styles/common/module.scss';

const AudioOutModule = {
  name: 'Audio out',
  inlets: [
    'INLET_AUDIO_OUT',
  ],
  src: `
    OUT_BUFFER[i] = INLET_AUDIO_OUT[i];
  `
};

export default createNode(AudioOutModule);
