import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor () {
    super();

    this.name = 'LFO';
    this.description = 'Low frequency oscillator.';

    this.outlets = [
      'OUT'
    ];
  }

  src () {
    return `
      let p = (i / GLOBAL_BUFFER_SIZE) * Math.PI * 2;
      let s = 1 + Math.sin(p);
      ${this.outlet('OUT')}[i] = s;
    `;
  }
}
