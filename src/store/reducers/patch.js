import Audio from '../../audio';
import {
  hashNet
} from '../../helpers';

const ACTIONS = {
  REFRESH: 'PATCH/ACTION/REFRESH',

  ADD_MODULE: 'PATCH/ACTION/ADD_MODULE',
  REMOVE_MODULE: 'PATCH/ACTION/REMOVE_MODULE',

  ADD_NET: 'PATCH/ACTION/ADD_NET',
  REMOVE_NET: 'PATCH/ACTION/REMOVE_NET',

  SELECT_MODULE: 'PATCH/ACTION/SELECT_MODULE',
  UNSELECT_MODULE: 'PATCH/ACTION/UNSELECT_MODULE',

  SELECT_LET_FROM: 'PATCH/ACTION/SELECT_LET_FROM',
  UNSELECT_LET_FROM: 'PATCH/ACTION/UNSELECT_LET_FROM',
  SELECT_LET_TO: 'PATCH/ACTION/SELECT_LET_TO',
  UNSELECT_LET_TO: 'PATCH/ACTION/UNSELECT_LET_TO',

  CONNECT_LETS: 'PATCH/ACTION/CONNECT_LETS',
  DISCONNECT_LETS: 'PATCH/ACTION/DISCONNECT_LETS',

  SET_MODULE_POSITION: 'PATCH/ACTION/SET_MODULE_POSITION'
};

const initialState = {
  selectedModule: null,
  selectedLetFrom: null,
  selectedLetTo: null,
  modules: {},
  nets: {}
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

export function selectLetFrom (inlet, moduleId, name) {
  return {
    type: ACTIONS.SELECT_LET_FROM,
    inlet,
    moduleId,
    name
  };
}

export function selectLetTo (inlet, moduleId, name) {
  return {
    type: ACTIONS.SELECT_LET_TO,
    inlet,
    moduleId,
    name
  };
}

export function unselectLetFrom () {
  return {
    type: ACTIONS.UNSELECT_LET_FROM
  };
}

export function unselectLetTo () {
  return {
    type: ACTIONS.UNSELECT_LET_TO
  };
}

export function connectLets () {
  return {
    type: ACTIONS.CONNECT_LETS
  }
}

export function disconnectLets (net) {
  return {
    type: ACTIONS.DISCONNECT_LETS,
    net
  }
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
      const {
        module
      } = action;

      patch.modules[module.id] = module;

      return Object.assign({}, patch);

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

    case ACTIONS.SELECT_LET_FROM:
      return Object.assign({}, patch, {
        selectedLetFrom: {
          inlet: action.inlet,
          name: action.name,
          moduleId: action.moduleId
        }
      });

    case ACTIONS.SELECT_LET_TO:
      return Object.assign({}, patch, {
        selectedLetTo: {
          inlet: action.inlet,
          name: action.name,
          moduleId: action.moduleId
        }
      });

    case ACTIONS.UNSELECT_LET_FROM:
      return Object.assign({}, patch, {
        selectedLetFrom: null,
      });

    case ACTIONS.UNSELECT_LET_TO:
      return Object.assign({}, patch, {
        selectedLetTo: null,
      });

    case ACTIONS.CONNECT_LETS:
      const {
        selectedLetFrom,
        selectedLetTo
      } = patch;

      if (selectedLetFrom && selectedLetTo) {
        if (selectedLetFrom.inlet !== selectedLetTo.inlet) {
          const from = `${selectedLetFrom.name}_${selectedLetFrom.moduleId}`;
          const to = `${selectedLetTo.name}_${selectedLetTo.moduleId}`;
          const net = [ from ];
          const method = selectedLetTo.inlet
            ? 'push'
            : 'unshift';
          net[method](to);
          const netHash = hashNet(net);

          if (!patch.nets[netHash]) {
            patch.nets[netHash] = net;
          }

          Audio.refreshAudio(patch);
          return Object.assign({}, patch);
        }
      }

      return patch;

    case ACTIONS.DISCONNECT_LETS:
      const {
        net
      } = action;
      const netHash = hashNet(net);

      if (patch.nets[netHash]) {
        patch.nets[netHash] = undefined;
        delete patch.nets[netHash];
      }
      
      Audio.refreshAudio(patch);
      return Object.assign({}, patch);

    case ACTIONS.SET_MODULE_POSITION:
      patch.modules[action.moduleId].position = action.coordinates;
      return Object.assign({}, patch);

      const moduleIndex = patch.modules.indexOf(patch.modules.find(m => m.id === action.moduleId));
      const newState = Object.assign({}, patch);
      if (moduleIndex >= 0) {
        newState.modules[moduleIndex].position = action.coordinates;
      }
      return newState;
  }

  return patch;
}
