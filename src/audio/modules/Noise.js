import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor () {
    super();

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
