import BaseModule from './BaseModule';

export default class VCAModule extends BaseModule {
  constructor () {
    super();

    this.name = 'VCA';
    this.description = '"Voltage" controlled amplifier.';
  }

  inlets () {
    return [
      this.getLet('IN_VCA_AUDIO'),
      this.getLet('IN_VCA_CV')
    ];
  }

  outlets () {
    return [
      this.getLet('OUT_VCA')
    ];
  }

  src () {
    return `
      ${this.getLet('OUT_VCA')}[i] = ${this.getLet('IN_VCA_AUDIO')}[i] * ${this.getLet('IN_VCA_CV')};
    `;
  }
}
