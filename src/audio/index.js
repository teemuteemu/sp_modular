window.AudioContext = window.AudioContext||window.webkitAudioContext;

const context = new AudioContext();
const config = {
  BUFFER_SIZE: 2048
};

function createScriptProcessorFunction (state) {
  const variableDeclr = state.nets
    .reduce((p, c) => p.concat(c))
    .map(n => `var ${n} = []`)
    .join('; ');

  const outputs = state.modules
    .filter(m => m.outlets.length > 0)
    .map(m => m.src);

  const inputs = state.modules
    .filter(m => m.inlets.length > 0)
    .map(m => m.src);

  const nets = state.nets.map(n => `${n[1]}[i] = ${n[0]}[i]`);

  const functionString = `
    const OUT_BUFFER = evt.outputBuffer.getChannelData(0);

    ${variableDeclr}

    for (var i = 0; i < OUT_BUFFER.length; i++) {
      ${outputs.join(' ')}
      ${nets.join(' ')}
      ${inputs.join(' ')}
    }
  `;

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
