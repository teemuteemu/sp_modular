import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor () {
    super();

    this.name = 'LFO';
    this.description = 'Low frequency oscillator.';

    this.outlets = [
      'OUT'
    ];

    /*
    this.params = {
      'PITCH': {
        type: 'number',
        range: [0, 1],
        value: 1
      }
    };
    */
  }

  src () {
    return `
      let step = ${this.parameter('PITCH')} * i;
      let p = (step / GLOBAL_BUFFER_SIZE) * Math.PI * 2;
      let s = 1 + Math.sin(p);
      ${this.outlet('OUT')}[i] = s;
    `;
  }
}
