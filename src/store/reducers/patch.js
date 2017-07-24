import Audio from '../../audio';

import AudioOut from '../../modules/AudioOut';
import Noise from '../../modules/Noise';

const ACTIONS = {
  REFRESH: 'PATCH/ACTION/REFRESH'
};

const initialState = {
  modules: [
    AudioOut,
    Noise
  ],
  nets: [
    ['OUTLET_NOISE', 'INLET_AUDIO_OUT']
  ]
};

export function refresh () {
  return {
    type: ACTIONS.REFRESH
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.REFRESH:
      Audio.initAudio(state);
      break;
  }

  return state;
}
