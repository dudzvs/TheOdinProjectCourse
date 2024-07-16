import { hash } from './genHashCode.js';

export class hashMap {
  constructor(genHashKey = hash) {
    this.genHashKey = genHashKey;
    this.table = {};
  }
}
