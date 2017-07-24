import createNode from './blueprint';

const Noise = {
  name: 'Noise',
  outlets: [
    'OUTLET_NOISE'
  ],
  src: `
    OUTLET_NOISE[i] = Math.random();
  `
};

export default createNode(Noise);
