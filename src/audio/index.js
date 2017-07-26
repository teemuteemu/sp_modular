window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new window.AudioContext();
const config = {
  BUFFER_SIZE: 2048
};

function getNets (nets, lt) {
  return nets.filter(n => n[1] === lt);
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
    .map(cid => state.modules.filter(m => m.id === cid))
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
  const rootNode = state.modules
    .filter(m => m.rootNode)[0];
  const src = flatten(walkTree(rootNode, state));

  const variableDeclr = state.modules
    .map(m => m.lets())
    .reduce((p, c) => p.concat(c))
    .map(n => `let ${n} = [];`)
    .join(' ');

  const functionString = `
    const GLOBAL_OUT_BUFFER = evt.outputBuffer.getChannelData(0);

    ${variableDeclr}

    for (let i = 0; i < GLOBAL_OUT_BUFFER.length; i++) {
      ${src.join(' ')}
    }
  `;

  console.log(functionString);

  return Function('evt', functionString);
}

const initAudio = (state) => {
  const node = context.createScriptProcessor(config.BUFFER_SIZE, 1, 1);
  const scriptProcessorCallback = createScriptProcessorFunction(state);

  node.onaudioprocess = scriptProcessorCallback;

  node.connect(context.destination);
};

const Audio = {
  initAudio
};

export default Audio;
