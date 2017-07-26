import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor () {
    super();

    this.name = 'Pulse';
    this.description = 'Square/PWM oscillator.';

    this.inlets = [
      'PITCH'
    ];

    this.outlets = [
      'OUT'
    ];
  }

  src () {
    return `
      let pitch = ${this.inlet('PITCH')}[i] || 0.33;
      let pt = 2048 * pitch;
      let val = (i % pt) / pt;
      ${this.outlet('OUT')}[i] = val;
    `;
  }
}
