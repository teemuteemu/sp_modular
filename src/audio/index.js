window.AudioContext = window.AudioContext||window.webkitAudioContext;

const context = new AudioContext();
const config = {
  NMR_CHANNEL: 1,
  TABLE_SIZE: 88200,
  SAMPLE_FREQ: 44100,
  BUFFER_SIZE: 2048
};

const REAL_TIME_FREQUENCY = 440;
const ANGULAR_FREQUENCY = REAL_TIME_FREQUENCY * 2 * Math.PI;

function generateSample(sampleNumber) {
  const sampleTime = sampleNumber / 44100;
  const sampleAngle = sampleTime * ANGULAR_FREQUENCY;

  return Math.sin(sampleAngle);
}

function createSine () {
  const buffer = context.createBuffer(config.NMR_CHANNEL, config.BUFFER_SIZE, config.SAMPLE_FREQ);
  const channel = buffer.getChannelData(0);

  for (let i=0; i<channel.length; i++) {
    channel[i] = generateSample(i);
  }

  return channel;
}

window.TABLES = {
  SINE: createSine()
}

function createScriptProcessorFunction (state) {
  const variableDeclr = state.nets
    .reduce((p, c) => p.concat(c))
    .map(n => `const ${n} = [];`)
    .join(' ');

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

    for (let i = 0; i < OUT_BUFFER.length; i++) {
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
