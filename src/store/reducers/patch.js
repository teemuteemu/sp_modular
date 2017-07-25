import Audio from '../../audio';

import AudioOut from '../../audio/modules/AudioOut';
import Noise from '../../audio/modules/Noise';
import VCA from '../../audio/modules/VCA';

const ACTIONS = {
  REFRESH: 'PATCH/ACTION/REFRESH'
};

const audioOut = new AudioOut();
const noise = new Noise();
const vca = new VCA();

const initialState = {
  modules: [
    audioOut,
    noise,
    vca
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
