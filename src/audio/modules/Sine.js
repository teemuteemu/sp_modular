import createNode from './blueprint';

const Sine = {
  name: 'Sine oscillator',
  outlets: [
    'OUTLET_SINE'
  ],
  src: `
    OUTLET_SINE[i] = TABLES.SINE[i];
  `
};

export default createNode(Sine);

