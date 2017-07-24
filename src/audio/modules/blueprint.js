const componentTemplate = {
  name: '',
  inlets: [],
  outlets: [],
  src: '',
  position: [10, 10]
};

const createNode = (node) => {
  return Object.assign({}, componentTemplate, node)
}

export default createNode;
