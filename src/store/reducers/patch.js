import Audio from '../../audio';

import AudioOut from '../../modules/AudioOut';
import Noise from '../../modules/Noise';

const initialState = {
  modules: [
    AudioOut,
    Noise
  ],
  nets: [
    ['OUTLET_0', 'INLET_0']
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case '@@redux/INIT':
      Audio.initAudio(state);
      break;
  }

  return state;
}
