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

  SELECT_LET: 'PATCH/ACTION/SELECT_LET',
  UNSELECT_LET: 'PATCH/ACTION/UNSELECT_LET',

  SET_MODULE_POSITION: 'PATCH/ACTION/SET_MODULE_POSITION'

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

export function setModulePosition (moduleId, coordinates) {
  return {
    type: ACTIONS.SET_MODULE_POSITION,
    moduleId,
    coordinates
  };
}

export default function (patch = initialState, action) {
  switch (action.type) {
    case ACTIONS.REFRESH:
      Audio.initAudio(patch);
      return patch;

    case ACTIONS.ADD_MODULE:
      patch.modules.push(action.module);
      return patch;

    case ACTIONS.REMOVE_MODULE:
      return patch.modules.filter(m => m.id !== action.id);

    case ACTIONS.ADD_NET:
      patch.nets.push(action.net);
      return patch;

    case ACTIONS.REMOVE_NET:
      return patch.modules.filter(n => n[0] !== action.net[0] && n[1] !== action.net[1]);

    case ACTIONS.SELECT_MODULE:
      return Object.assign({}, patch, {
        selectedModule: action.moduleId
      });

    case ACTIONS.UNSELECT_MODULE:
      return Object.assign({}, patch, {
        selectedModule: null
      });

    case ACTIONS.SELECT_LET:
      const {
        name,
        moduleId
      } = action;
      return Object.assign({}, patch, {
        selectedLet: {
          name,
          moduleId
        }
      });

    case ACTIONS.UNSELECT_LET:
      return Object.assign({}, patch, {
        selectedLet: null
      });

    case ACTIONS.SET_MODULE_POSITION:
      const moduleIndex = patch.modules.indexOf(patch.modules.find(m => m.id === action.moduleId));
      const newState = Object.assign({}, patch);
      if (moduleIndex >= 0) {
        newState.modules[moduleIndex].position = action.coordinates;
      }
      return newState;
  }

  return patch;
}
