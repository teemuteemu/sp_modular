import BaseModule from './BaseModule';

export default class VCAModule extends BaseModule {
  constructor () {
    super();

    this.name = 'VCA';
    this.description = '"Voltage" controlled amplifier.';

    this.inlets = [
      'IN_VCA_AUDIO',
      'IN_VCA_CV'
    ];

    this.outlets = [
      'OUT_VCA'
    ];
  }

  src () {
    return `
      ${this.outlet('OUT_VCA')}[i] = ${this.inlet('IN_VCA_AUDIO')}[i] * ${this.inlet('IN_VCA_CV')}[1];
    `;
  }
}
