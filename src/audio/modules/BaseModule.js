import { guid } from '../../helpers';

export default class BaseModule {
  constructor () {
    this.id = guid();
    this.name = 'Untitled module';
    this.description = 'No description available';
    this.position = [
      Math.random() * (window.innerWidth / 2),
      Math.random() * (window.innerHeight / 2)
    ];

    this.inlets = [];
    this.outlets = [];
    this.params = {};
  }

  lets () {
    const ins = this.inlets.map(this.letId.bind(this));
    const outs = this.outlets.map(this.letId.bind(this));

    return ins.concat(outs);
  }

  inlet (letName) {
    return this.letId(letName);
  }

  outlet (letName) {
    return this.letId(letName);
  }

  letId (letName) {
    if (this.outlets.indexOf(letName) >= 0 || this.inlets.indexOf(letName) >= 0) {
      return `${letName}_${this.id}`;
    }

    return null;
  }

  parameter (paramName) {
    const param = this.params[paramName]
    const value = param && param.value
      ? param.value
      : 0;
    return value;
  }

  src () {
    return '';
  }
}
