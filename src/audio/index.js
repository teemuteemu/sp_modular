window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new window.AudioContext();
const config = {
  BUFFER_SIZE: 2048
};

function objToArray (obj) {
  return Object.keys(obj)
    .map(id => obj[id]);
}

function getNets (nets, lt) {
  return objToArray(nets).filter(n => n[1] === lt);
}

function getNodeInlets (node) {
  return node.inlets
    .map(i => node.inlet(i));
}

function toAssignment (nets, inlets) {
  return inlets
    .map(i => {
      const ns = getNets(nets, i);
      return ns.map(n => `${n[1]}[i] = ${n[0]}[i];`);
    })
    .reduce((p, c) => p.concat(c))
    .reduce((p, c) => p.concat(c), []);
}

function nodeToSrc (node, state) {
  const src = [];
  const inlets = getNodeInlets(node);

  src.unshift(node.src());

  if (inlets.length > 0) {
    src.unshift(toAssignment(state.nets, inlets));
  }

  return src;
}

function getChildNodes (node, state) {
  const inlets = getNodeInlets(node);

  if (inlets.length === 0) {
    return [];
  }

  const ns = inlets
    .map(i => getNets(state.nets, i));
  const childLets = ns
    .map(n => n.map(_n => _n[0]))
    .reduce((p, c) => p.concat(c));
  const childNodeIds = childLets
    .map(cl => {
      const fs = cl.split('_');
      return fs[fs.length - 1];
    });
  const childNodes = childNodeIds
    .map(cid => state.modules[cid])
    .reduce((p, c) => p.concat(c), []);

  return childNodes;
}

function walkTree (node, state) {
  const nodeSrc = nodeToSrc(node, state);
  const childNodes = getChildNodes(node, state);

  if (childNodes.length > 0) {
    const childs = childNodes
      .map(c => walkTree(c, state));
    return childs.concat(nodeSrc);
  }

  return nodeSrc
      .reduce((p, c) => p.concat(c));
}

function flatten (arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function createScriptProcessorFunction (state) {
  let functionString;

  // TODO rootNode is problematic hax0r workaround
  const rootNode = objToArray(state.modules)
    .filter(m => m.rootNode)[0];

  if (rootNode) {
    const src = flatten(walkTree(rootNode, state));

    const variableDeclr = objToArray(state.modules)
      .map(m => m.lets())
      .reduce((p, c) => p.concat(c))
      .map(n => `let ${n} = [];`)
      .join(' ');

    functionString = `
      const GLOBAL_OUT_BUFFER = evt.outputBuffer.getChannelData(0);
      const GLOBAL_BUFFER_SIZE = ${config.BUFFER_SIZE};

      ${variableDeclr}

      for (let i = 0; i < GLOBAL_OUT_BUFFER.length; i++) {
        ${src.join(' ')}
      }
    `;
  } else {
    functionString = '';
  }
  // console.log(functionString);

  return Function('evt', functionString);
}

let node;

const initAudio = (state) => {
  if (!node) {
    node = context.createScriptProcessor(config.BUFFER_SIZE, 1, 1);
    node.connect(context.destination);
  }

  refreshAudio(state);
};

const refreshAudio = (state) => {
  if (node) {
    const scriptProcessorCallback = createScriptProcessorFunction(state);
    node.onaudioprocess = scriptProcessorCallback;
  } else {
    console.error('refreshAudio called before initAudio');
  }
}

const Audio = {
  initAudio,
  refreshAudio
};

export default Audio;
