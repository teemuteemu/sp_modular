import BaseModule from './BaseModule';

export default class NoiseModule extends BaseModule {
  constructor (options) {
    super(options);

    this.name = 'Range';
    this.description = 'A dial.';

    this.outlets = [
      'OUT'
    ];

    this.params = {
      'RANGE': {
        type: 'number',
        range: 1000,
        value: 1
      }
    };
  }

  src () {
    return `
      ${this.outlet('OUT')}[i] = ${this.parameter('RANGE')};
    `;
  }
}
