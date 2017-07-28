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
  REMOVE_NET: 'PATCH/ACTION/REMOVE_NET',
  SELECT_MODULE: 'PATCH/ACTION/SELECT_MODULE',
  UNSELECT_MODULE: 'PATCH/ACTION/UNSELECT_MODULE',
  SET_MODULE_POSITION: 'PATCH/ACTION/SET_MODULE_POSITION',
  SELECT_LET: 'PATCH/ACTION/SELECT_LET',
  UNSELECT_LET: 'PATCH/ACTION/UNSELECT_LET'
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
  selectedModule: null,
  selectedLet: null,
  nets: [
    [pulse.outlet('OUT'), vca.inlet('AUDIO')],
    [noiseCV.outlet('OUT'), vca.inlet('CV')],
    [vca.outlet('OUT'), audioOut.inlet('IN')]
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

export function selectModule (moduleId) {
  return {
    type: ACTIONS.SELECT_MODULE,
    moduleId
  };
}

export function unselectModule () {
  return {
    type: ACTIONS.UNSELECT_MODULE
  };
}

export function setModulePosition (moduleId, coordinates) {
  return {
    type: ACTIONS.SET_MODULE_POSITION,
    moduleId,
    coordinates
  };
}

export function selectLet (moduleId, name) {
  return {
    type: ACTIONS.SELECT_LET,
    moduleId,
    name
  };
}

export function unselectLet () {
  return {
    type: ACTIONS.UNSELECT_LET
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

    case ACTIONS.SELECT_MODULE:
      state.selectedModule = action.moduleId;
      return state;

    case ACTIONS.UNSELECT_MODULE:
      state.selectedModule = null;
      return state;

    case ACTIONS.SET_MODULE_POSITION:
      const moduleIndex = state.modules.indexOf(state.modules.find(m => m.id === action.moduleId));
      const newState = Object.assign({}, state);
      if (moduleIndex >= 0) {
        newState.modules[moduleIndex].position = action.coordinates;
      }
      return newState;

    case ACTIONS.SELECT_LET:
      state.selectedLet = action.let;
      return state;

    case ACTIONS.UNSELECT_LET:
      state.selectedLet = null;
      return state;
  }

  return state;
}
