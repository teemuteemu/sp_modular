import BaseModule from './BaseModule';

export default class AudioOutModule extends BaseModule {
  constructor (options) {
    super(options);

    this.name = 'Audio Out';
    this.description = 'Master audio out node.';
    this.rootNode = true; // dirty hack for composing a node tree

    this.inlets = [
      'IN'
    ];
  }

  src () {
    return `
      GLOBAL_OUT_BUFFER[i] = ${this.inlet('IN')}[i];
    `;
  }
}
