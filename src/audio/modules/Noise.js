import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor () {
    super();

    this.name = 'Noise';
    this.description = 'White noise node.';
  }

  outlets () {
    return [
      this.getLet('OUTLET_NOISE')
    ];
  }

  src () {
    return `
      ${this.getLet('OUTLET_NOISE')}[i] = Math.random();
    `;
  }
}
