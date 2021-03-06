import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor (options) {
    super(options);

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
      let pitch = ${this.inlet('PITCH')}[i] || 0.5;
      let pt = 2048 * pitch;
      let val = (i % pt) / pt;
      ${this.outlet('OUT')}[i] = val;
    `;
  }
}
