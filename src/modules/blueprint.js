const componentTemplate = {
  name: '',
  inlets: [],
  outlets: [],
  src: '',
  position: [0, 40]
};

const createNode = (node) => {
  return Object.assign({}, componentTemplate, node)
}

export default createNode;
