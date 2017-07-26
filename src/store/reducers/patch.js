import Audio from '../../audio';

import AudioOut from '../../audio/modules/AudioOut';
import Noise from '../../audio/modules/Noise';
import Pulse from '../../audio/modules/Pulse';
import VCA from '../../audio/modules/VCA';

const ACTIONS = {
  REFRESH: 'PATCH/ACTION/REFRESH',
  ADD_MODULE: 'PATCH/ACTION/ADD_MODULE',
  REMOVE_MODULE: 'PATCH/ACTION/REMOVE_MODULE',
  ADD_NET: 'PATCH/ACTION/ADD_NET',
  REMOVE_NET: 'PATCH/ACTION/REMOVE_NET'
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
    [pulse.outlet('OUT'), audioOut.inlet('IN')],
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

export function addModule (module) {
  return {
    type: ACTIONS.ADD_MODULE,
    module
  };
}

export function removeModule (id) {
  return {
    type: ACTIONS.REMOVE_MODULE,
    id
  };
}

export function addNet (net) {
  return {
    type: ACTIONS.ADD_NET,
    net
  };
}

export function removeNet (net) {
  return {
    type: ACTIONS.REMOVE_NET,
    net
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.REFRESH:
      Audio.initAudio(state);
      return state;
    case ACTIONS.ADD_MODULE:
      state.modules.push(action.module);
      return state;
    case ACTIONS.REMOVE_MODULE:
      return state.modules.filter(m => m.id !== action.id);
    case ACTIONS.ADD_NET:
      state.nets.push(action.net);
      return state;
    case ACTIONS.REMOVE_NET:
      return state.modules.filter(n => n[0] !== action.net[0] && n[1] !== action.net[1]);
  }

  return state;
}
