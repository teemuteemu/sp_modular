import { guid } from '../../helpers';

export default class BaseModule {
  constructor () {
    this.id = guid();
    this.name = 'Untitled module';
    this.description = 'No description available';
    this.position = [10, 10]; // TODO
  }

  inlets () {
    return [];
  }

  outlets () {
    return [];
  }

  getLet (letName) {
    return `${letName}_${this.id}`;
  }

  src () {
    return '';
  }
}
