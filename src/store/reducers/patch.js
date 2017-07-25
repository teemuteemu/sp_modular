import Audio from '../../audio';

import AudioOut from '../../audio/modules/AudioOut';
import Noise from '../../audio/modules/Noise';

const ACTIONS = {
  REFRESH: 'PATCH/ACTION/REFRESH'
};

const audioOut = new AudioOut();
const noise = new Noise();

const initialState = {
  modules: [
    audioOut,
    noise
  ],
  nets: [
    [noise.outlets()[0], audioOut.inlets()[0]]
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
