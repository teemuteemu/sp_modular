import BaseModule from './BaseModule';

export default class VCAModule extends BaseModule {
  constructor (options) {
    super(options);

    this.name = 'VCA';
    this.description = '"Voltage" controlled amplifier.';

    this.inlets = [
      'AUDIO',
      'CV'
    ];

    this.outlets = [
      'OUT'
    ];
  }

  src () {
    return `
      ${this.outlet('OUT')}[i] = ${this.inlet('AUDIO')}[i] * ${this.inlet('CV')}[1];
    `;
  }
}
