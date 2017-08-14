import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor (options) {
    super(options);

    this.name = 'Noise';
    this.description = 'White noise node.';

    this.outlets = [
      'OUT'
    ];
  }

  src () {
    return `
      ${this.outlet('OUT')}[i] = Math.random();
    `;
  }
}
