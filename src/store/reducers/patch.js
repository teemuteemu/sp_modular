import Audio from '../../audio';

import AudioOut from '../../audio/modules/AudioOut';
import Noise from '../../audio/modules/Noise';
import Pulse from '../../audio/modules/Pulse';
import VCA from '../../audio/modules/VCA';

const ACTIONS = {
  REFRESH: 'PATCH/ACTION/REFRESH'
};

const audioOut = new AudioOut();
const noise = new Noise();
const pulse = new Pulse();
const vca = new VCA();
const noiseCV = new Noise();

const initialState = {
  modules: [
    audioOut,
    noise,
    vca,
    noiseCV,
    pulse
  ],
  nets: [
    [pulse.outlet('OUT'), audioOut.inlet('AUDIO_OUT_IN')],
    /*
    [pulse.outlet('OUT'), vca.inlet('IN_VCA_AUDIO')],
    [noiseCV.outlet('NOISE_OUT'), vca.inlet('IN_VCA_CV')],
    [vca.outlet('OUT_VCA'), audioOut.inlet('AUDIO_OUT_IN')]
    /*
    [pulse.outlet('PULSE_OUT'), vca.inlet('IN_VCA_AUDIO')],
    [noiseCV.outlet('NOISE_OUT'), vca.inlet('IN_VCA_CV')],
    [vca.outlet('OUT_VCA'), audioOut.inlet('AUDIO_OUT_IN')]
    */
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
