import BaseModule from './BaseModule';

export default class AudioOutModule extends BaseModule {
  constructor () {
    super();

    this.name = 'Audio Out';
    this.description = 'Master audio out node.';
    this.rootNode = true; // dirty hack for composing a node tree

    this.inlets = [
      'AUDIO_OUT_IN'
    ];
  }

  src () {
    return `
      GLOBAL_OUT_BUFFER[i] = ${this.inlet('AUDIO_OUT_IN')}[i];
    `;
  }
}
