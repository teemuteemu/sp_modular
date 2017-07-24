import Audio from '../../audio';

import AudioOut from '../../modules/AudioOut';
import Noise from '../../modules/Noise';

const initialState = {
  modules: [
    AudioOut,
    Noise
  ],
  nets: [
    ['OUTLET_NOISE', 'INLET_AUDIO_OUT']
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
