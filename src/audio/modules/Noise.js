import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor () {
    super();

    this.name = 'Noise';
    this.description = 'White noise node.';

    this.outlets = [
      'NOISE_OUT'
    ];
  }

  src () {
    return `
      ${this.outlet('NOISE_OUT')}[i] = Math.random();
    `;
  }
}
