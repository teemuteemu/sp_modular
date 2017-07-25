import BaseModule from './BaseModule';

export default class AudioOutModule extends BaseModule {
  constructor () {
    super();

    this.name = 'Audio Out';
    this.description = 'Master audio out node.';
  }

  inlets () {
    return [
      this.getLet('INLET_AUDIO_OUT')
    ];
  }

  src () {
    return `
      GLOBAL_OUT_BUFFER[i] = ${this.getLet('INLET_AUDIO_OUT')}[i];
    `;
  }
}

/*
const AudioOutModule = {
  name: 'Audio out',
  inlets: [
    'INLET_AUDIO_OUT',
  ],
  src: `
    OUT_BUFFER[i] = INLET_AUDIO_OUT[i];
  `
};

export default createNode(AudioOutModule);
*/
